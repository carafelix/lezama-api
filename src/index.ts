import { webhookCallback } from 'grammy';
import getBot from './bot';

export default {

  async fetch(req: Request , env: Env, c: ExecutionContext) {
    let response = new Response('Bot initialization failed')

    try {
      const bot = await getBot(env)
      response = await webhookCallback(bot, 'cloudflare-mod')(req)
    }
      catch(err){
        console.log(err);
    }
    return response
  },
  async scheduled(e: ScheduledController, env: Env, c: ExecutionContext) {
    switch (e.cron) {
      case "1 * * * *":
        console.log('dispatch cron')
        break;
    }
    return
  }

} satisfies ExportedHandler<Env>