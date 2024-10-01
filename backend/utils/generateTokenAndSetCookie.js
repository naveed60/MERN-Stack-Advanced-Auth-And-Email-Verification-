import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
	const JWT_SECRET ="efd8e3bff8d78e2750b27fea14290c53ecfff4796d93a9e48c2adc7f292560f8"
	console.log("JWT Secret being used:", JWT_SECRET);
	const token = jwt.sign({ userId },JWT_SECRET, {
		expiresIn: "7d",
	});

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	return token;
};
