import { NextApiRequest, NextApiResponse } from 'next';
import { WebClient } from '@slack/web-api';

const slackToken = process.env.SLACK_BOT_TOKEN;
const slackChannelId = process.env.SLACK_CHANNEL_ID;

const slackClient = new WebClient(slackToken);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === 'POST') {
		const { name, email, message } = req.body;
		const mailtoLink = `mailto:${email}?subject=Reply to your message&body=${encodeURIComponent(
			`Hi ${name},\n\nThank you for your message!\n\n">> ${message}"\n\n`
		)}`;

		try {
			await slackClient.chat.postMessage({
				channel: slackChannelId!,
				blocks: [
					{
						type: 'section',
						text: {
							type: 'mrkdwn',
							text: `*Message from ${name} (${email}):*\n\n${message}`,
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
								action_id: 'button-action',
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
