'use server';

import { generateText } from 'ai';
import { createPortkey } from '@portkey-ai/vercel-provider';

export const generateTextAction = async () => {
  // Fallback config
  const portkey_config = {
    strategy: {
      mode: 'loadbalance',
    },
    targets: [
      {
        provider: 'anthropic',
        api_key: 'YOUR_ANTHROPIC_API_KEY',
        override_params: {
          model: 'claude-3-5-sonnet-20240620',
        },
        weight: 0.25,
      },
      {
        provider: 'openai',
        api_key: 'YOUR_OPENAI_API_KEY',
        override_params: {
          model: 'gpt-4o',
        },
        weight: 0.75,
      },
    ],
  };

  const llmClient = createPortkey({
    apiKey: 'PORTKEY_API_KEY',
    config: portkey_config,
    //Portkey's config allows you to use- loadbalance, fallback, retires, timeouts, semantic caching, conditional routing, guardrails,etc. Head over to portkey docs to learn more
    //we are using API keys inside config, that's why no virtual keys needed
  });

  // Learn more at docs.portkey.ai

  const result = await generateText({
    model: llmClient.completionModel('gpt-3.5-turbo'), //choose model of choice
    prompt: 'tell me a joke',
  });

  return result.text;
};