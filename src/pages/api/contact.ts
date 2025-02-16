import { NextApiRequest, NextApiResponse } from 'next';
import { WebClient } from '@slack/web-api';

const slackToken = process.env.SLACK_BOT_TOKEN;
const slackChannelId = process.env.SLACK_CHANNEL_ID;

const slackClient = new WebClient(slackToken);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { name, email, message } = req.body;
		const mailtoLink = `mailto:${email}?subject=Reply to your message&body=${encodeURIComponent(
			`Hi ${name},\n\nThank you for your message!\n\n">> ${message}"\n\nBest regards,`
		)}`;

		try {
			await slackClient.chat.postMessage({
				channel: slackChannelId!,
				text: `Message from ${name} (${email}): ${message}`,
				blocks: [
					{
						type: 'section',
						text: {
							type: 'mrkdwn',
							text: `*Message from ${name} (<mailto:${email}|${email}>):*\n\n${message}`,
						},
					},
					{
						type: 'actions',
						elements: [
							{
								type: 'button',
								text: {
									type: 'plain_text',
									text: 'Reply via Email',
								},
								url: mailtoLink,
								action_id: 'repy_via_email',
							},
						],
					},
				],
			});
			res.status(200).json({ success: true });
		} catch (error) {
			console.error(error);
			res.status(500).json({ success: false });
		}
	} else {
		res.status(405).json({ success: false });
	}
}
