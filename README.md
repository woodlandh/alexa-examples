# alexa-examples
First attempt at writing Amazon Alexa skills. All three skills have been published and are available to be installed.

![Sloth Facts](/SlothFacts/slothfacts_108px.png?raw=true)

[SlothFacts](http://alexa.amazon.com/spa/index.html#skills/dp/B01IFPEWCI/?ref=skill_dsk_skb_sr_0) gives you a random fact about sloths

![Cloud Acronym Quiz](/CloudAcronymQuiz/awsquiz_108px.png?raw=true)

[CloudAcronymQuiz](http://alexa.amazon.com/spa/index.html#skills/dp/B01IGF9YHU/?ref=skill_dsk_skb_sr_0) tests your knowledge of AWS acronyms

![13 Month Calendar](/13MonthCalendar/13months_108px.png?raw=true)

[13MonthCalendar](http://alexa.amazon.com/spa/index.html#skills/dp/B01IGQ0U5Y/?ref=skill_dsk_skb_sr_0) tells you today's date on the obscure calendar

Advice for Alexa developers:
* "Amazon" is a protected word, which caused complications in the Cloud Acronym Quiz
* "Calendar" is a protected word, which meant I had to use "13 Month Cal"
* When publishing, your "Example Phrases" section [must conform to numerous policies](https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/supported-phrases-to-begin-a-conversation?ref_=pe_679090_102923190).

Logic is primarily from [Amazon's samples](https://github.com/amzn/alexa-skills-kit-js), with my minor modifications and substituted content. The license is reproduced here as per Apache 2.0.
