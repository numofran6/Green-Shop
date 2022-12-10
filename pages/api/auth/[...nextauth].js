import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import User from '../../../models/User';
import db from '../../../utils/db';
import bcrypt from 'bcryptjs';

export default NextAuth({
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user?.id) token.id = user.id;
			if (user?.isAdmin) token.isAdmin = user.isAdmin;
			return token;
		},
		async session({ session, token }) {
			if (token?.id) session.id = token.id;
			if (token?.isAdmin) session.isAdmin = token.isAdmin;
			return session;
		},
	},
	providers: [
		CredentialProvider({
			async authorize(credentials) {
				await db.connect();
				const user = await User.findOne({ email: credentials.email });
				await db.disconnect();

				if (user && bcrypt.compareSync(credentials.password, user.password)) {
					return {
						id: user.id,
						name: user.name,
						email: user.email,
						isAdmin: user.isAdmin,
					};
				} else {
					throw new Error('Invalid email or password');
				}
			},
		}),
	],
});
