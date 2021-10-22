import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Twitter({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
    Providers.Credentials({
      async authorize(credentials) {
        //Connect to DB
        const client = await MongoClient.connect(
          `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}.n4tnm.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
          { useNewUrlParser: true, useUnifiedTopology: true }
        );
        //Get all the users
        const users = await client.db().collection("users");
        //Find user with the email
        const result = await users.findOne({
          email: credentials.email,
        });
        //Not found - send error res
        if (!result) {
          client.close();
          throw new Error("No user found with the email");
        }
        //Check hased password with DB password
        const checkPassword = await compare(
          credentials.passowrd,
          result.passowrd
        );
        //Incorrect password - send response
        if (!checkPassword) {
          client.close();
          throw new Error("Password doesnt match");
        }
        //Else send success response
        client.close();
        return { email: result.email };
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
};

export default (req, res) => NextAuth(req, res, options);
