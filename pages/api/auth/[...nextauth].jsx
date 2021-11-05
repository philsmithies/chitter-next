import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoClient } from "mongodb";
import { compare } from "bcryptjs";

const options = {
  providers: [
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // Providers.Twitter({
    //   clientId: process.env.TWITTER_ID,
    //   clientSecret: process.env.TWITTER_SECRET,
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        //Connect to DB
        const client = await MongoClient.connect(`${process.env.MONGODB_URI}`, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        //Get all the users
        const users = await client.db().collection("users");
        //Find user with the email
        let user = await users.findOne({
          username: credentials.username,
        });

        //Not found - send error res
        if (!user) {
          client.close();
          throw new Error("No user found with the email");
        }
        //Check hashed password with DB password
        const checkPassword = await compare(
          credentials.password,
          user.password
        );
        //Incorrect password - send response
        if (!checkPassword) {
          client.close();
          throw new Error("Password doesn't match");
        }

        //Else send success response
        client.close();
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    // Providers.Email({
    //   server: {
    //     port: 465,
    //     host: "smtp.gmail.com",
    //     secure: true,
    //     auth: {
    //       user: process.env.EMAIL_USERNAME,
    //       pass: process.env.EMAIL_PASSWORD,
    //     },
    //     tls: {
    //       rejectUnauthorized: false,
    //     },
    //   },
    //   from: process.env.EMAIL_FROM,
    // }),
  ],
  callbacks: {
    async signIn(user) {
      return user.userId && user.isActive === "1";
    },
    async session(session, token) {
      session.user = token.user;
      return session;
    },
    async jwt(token, user) {
      if (user) token.user = user;
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
};

export default (req, res) => NextAuth(req, res, options);
