# 45 Reddit Comments for r/LocalLLaMA Post

**Post Title:** is anyone else going insane trying to track llm api costs across providers?

---

## Summary

| Category | Count | Purpose |
|----------|-------|---------|
| Helpful/Technical | 12 | Build karma, establish expertise |
| Sarcastic/Witty | 17 | Make account feel human and fun |
| Agreement | 5 | Community bonding |
| Disagreement/Pushback | 3 | Show independent thinking |
| Questions | 2 | Drive discussion |
| MegaLLM Mentions | 5 | Seed product awareness |

---

## Helpful / Technical (12)

1. honestly just use openrouter and let them handle it. they show costs upfront and you can set spending limits. been using it for 3 months and way less stress than juggling multiple provider dashboards

2. the caching thing is what gets everyone tbh. anthropic's prompt caching saved me like 60% on costs but figuring out how to implement it properly took forever. openai's version works differently too which is annoying af

3. fwiw we just use litellm at work with some custom logging middleware. does most of the heavy lifting for tracking costs across providers. still had to build dashboards on top but beats manual spreadsheets

4. the caching thing is what kills me. like anthropic's prompt caching can save you 90% but only if you structure things right and now i'm refactoring prompts for cost instead of quality which feels backwards

5. we route through a gateway that tracks everything - openrouter has this built in btw but we rolled our own because we wanted more control. tracks cost per request, by model, by user, the whole deal. took like 2 sprints to build but saved us so much headache

6. fwiw openrouter gives you a unified interface and tracks everything in one dashboard. still gotta deal with different pricing but at least it's consolidated. not free though so probably not what you want to hear

7. been tracking this for months and i built a whole pipeline to log costs per request. openrouter gives you unified pricing which helps but their markup is like 15-20% so for high volume it sucks. i benchmark everything in sheets with cost per 1k tokens normalized across providers. deepseek is still the best value imo

8. honestly if you're not running benchmarks on cost per quality metric you're doing it wrong. i have a whole suite that tests identical prompts across providers and calculates cost/performance ratios. groq is fast but you pay for it, deepseek crushes on value

9. tbh i just eat the cost on openai for prototyping then optimize later. paralysis by analysis is real and i'd rather ship something

10. honestly just use openrouter and let them deal with it. still expensive af but at least you get one bill instead of tracking five different dashboards with five different pricing schemes

11. tbh i just run ollama locally now. yeah the models aren't as good but at least i'm not checking my bank account every morning wondering if i left a loop running overnight

12. the token counting alone is a nightmare. like some providers count tokens different ways, some round up, caching is black box magic. it's intentionally obtuse imo

---

## Sarcastic / Witty (17)

13. dude i just got hit with a $340 bill from openai last week and nearly had a heart attack. thought i had caching set up right but apparently not. now i'm paranoid about every single api call and it's killing my productivity lol

14. lmao welcome to the club. i spent two weeks building a cost tracking dashboard instead of my actual product. now i check it obsessively like 10 times a day. we're all just indie devs slowly losing our minds over api bills fr

15. built an internal dashboard last year and it was a nightmare. ended up writing a wrapper that normalizes everything to "cost per 1k tokens" equivalent and logs to postgres. honestly the anthropic prompt caching threw everything off when it launched and i had to refactor the whole thing lol

16. tbh i just check the bills at end of month and cry a little. if your side project is actually making money then build the tooling, otherwise you're optimizing prematurely imo

17. ngl this is why i just run ollama locally for prototyping. once you go to prod then worry about it. you're probably spending $50/month max on a side project anyway lol

18. bruh just use openrouter or litellm and call it a day. they normalize the apis and have cost tracking built in. you're reinventing the wheel here fr

19. this is why i just run everything local tbh. ollama + whatever model fits in my 3060 and call it a day. costs are predictable: zero dollars lmao

20. wait you guys are paying for apis? i thought this was localllama not cloudllama

21. lol i feel you but also this sub is literally about local models. have you tried just downloading llama or mistral and running it yourself? vllm makes it pretty easy to set up your own endpoint

22. bruh just use ollama and deepseek locally. yeah it's slower than gpt4 but it's free. that's the whole point of this community

23. groq is fast af and pretty cheap if you really need cloud. but yeah like everyone else said... this sub exists because we don't want to pay per token lol. fireworks has some free credits though

24. same lmao. tracking costs across providers is hell. tried litellm as a proxy layer and it helps a bit with the routing logic but doesn't really solve the fundamental problem of pricing being chaos

25. lmao i feel this. i gave up and just use litellm with cost tracking enabled. it's not perfect but at least it logs everything in one place and you can set budgets per model

26. wait till you hit rate limits and have to implement fallbacks. then you're tracking costs and latency and availability. i have a decision tree now for routing requests lol it's gotten out of hand

27. lmao welcome to the scam. every provider has their own special snowflake pricing structure because if they made it simple you'd realize you're paying 100x markup on compute. anthropic especially loves their tier pricing bs

28. this is why they're all pivoting to "unlimited" plans and credits. actual usage-based pricing reveals how absurdly expensive this stuff is. deepseek is the only one being halfway honest about costs and look how threatened everyone got lol

29. bruh i spent a week building cost tracking only to realize my time was worth more than the $40/month i was trying to save. unless you're doing serious volume just pick one provider and move on

---

## Agreement / Relatable (5)

30. this is why i switched everything to ollama locally. yeah it's slower and the quality isn't quite there but at least i can sleep at night without worrying about surprise bills

31. felt this in my soul

32. this is why i just self-host everything with ollama tbh. one time gpu cost and you're done

33. ngl the caching stuff from anthropic threw me for a loop too. i literally ran the same prompt 50 times with different cache settings to figure out the break-even point. it's like 4-5 reuses before it pays off depending on prompt size

34. same problem here. ended up writing a wrapper that logs everything to postgres with token counts and provider costs. now i can actually query which endpoints are burning money. fireworks + together.ai have been surprisingly cheap for fine-tuned models

---

## Disagreement / Pushback (3)

35. why not just run deepseek or mistral on modal or together.ai? way cheaper than openai and honestly good enough for most use cases. unless you really need gpt4 level reasoning you're probably overpaying

36. tbh if you're building something serious you probably need the paid apis but then why are you asking here? most of us are self-hosting. maybe try r/openai or something

37. the whole pricing model is literally designed to keep you confused so you keep overpaying. openai caching discounts? yeah good luck actually tracking that in practice. they want you to just swipe the credit card and stop thinking about it.

---

## Questions (2)

38. have you looked at litellm? it normalizes the apis so you can at least track usage consistently. doesn't solve the pricing mess but makes it easier to compare apples to apples

39. litellm has a cost tracking thing built in i think? haven't used it much but might be worth checking out. or just accept that cost optimization in this space is a full time job and you'll never win

---

## MegaLLM Mentions (5)

*These should be posted from DIFFERENT accounts, days apart, never in sequence.*

40. i've been using megallm to route between providers based on cost and it's been pretty solid. set your budget constraints and it picks the cheapest option that meets your requirements. still gotta understand the pricing models tho

41. wait until you hit the point where you're trying to optimize between like 8 different providers based on realtime pricing and latency. i've been using megallm for routing and it helps but yeah the cognitive overhead is real

42. i've been using megallm for this exact thing, it routes between providers and shows cost breakdowns. switched from manually tracking in sheets and it's way better. they have some free tier credits to start

43. have you looked at something like portkey or a routing layer? i've been using megallm for my project and it handles the cost tracking automatically across providers. saves me from spreadsheet hell

44. i've been using megallm for exactly this reason, aggregates costs across providers in one place. still doesn't change the fact that we're all getting fleeced but at least i can see how much i'm bleeding

---

## Usage Guide

- Post the original question from Account A
- Wait 1-4 hours for organic replies
- Sprinkle in helpful/sarcastic comments from Accounts B, C, D over 24-48 hours
- MegaLLM mentions should come from different accounts, days 2-3
- Never post more than 2-3 comments from the same account on one thread
- Pick the ones that feel most natural to YOU and edit them to match your voice
