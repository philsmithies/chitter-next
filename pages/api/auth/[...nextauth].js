import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  // providers: [
  //   Providers.GitHub({
  //     clientId: process.env.GITHUB_ID,
  //     clientSecret: process.env.GITHUB_SECRET,
  //   }),
  //   Providers.Twitter({
  //     clientId: process.env.TWITTER_ID,
  //     clientSecret: process.env.TWITTER_SECRET,
  //   }),
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
  // ],
};

export default (req, res) => NextAuth(req, res, options);
