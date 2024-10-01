import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";

dotenv.config();

const MAILTRAP_ENDPOINT ="https://send.api.mailtrap.io/";
const MAILTRAP_TOKEN="863c35416f1b2f42bcb0139b525429a7";
export const mailtrapClient = new MailtrapClient({
	endpoint: MAILTRAP_ENDPOINT,
	token: MAILTRAP_TOKEN,
});

export const sender = {
	email: "hello@demomailtrap.com",
	name: "Mail Trap",
};
