/**
 * HISTORY — skill chains, for APUSH I and II and AP European History.
 *
 * TODO: confirm with an APUSH teacher before these go in front of students.
 *
 * These sit UNDER the College Board's historical thinking skills rather than
 * testing them. The framework says a student must source a document and
 * contextualize it; these ask whether the student can do the thing a person has
 * to be able to do first — notice that a document had an author with a motive,
 * tell a cause from a thing that merely came next. Same relationship the
 * catalog has to the skill layer everywhere else in this project.
 *
 * Like the writing bank, the distractors carry the diagnosis: reading sequence
 * as cause, discarding a source for having a point of view, answering "what"
 * where the prompt asked "why". The scenarios are generic rather than tied to
 * specific documents, so they work in APUSH and AP Euro alike.
 */

import type { SeedQuestion } from "./types";

export const HISTORY_QUESTIONS: SeedQuestion[] = [
  // ===== Reading a source for who wrote it and why =====
  {
    id: "q-sourcing-1",
    skillId: "sourcing-a-document",
    prompt:
      `A pamphlet attacking a new tax was printed by a merchants' association in the port the tax hit hardest.` + "\n" +
      `What does knowing that do to how you can use it?`,
    options: [
      {
        text: `It makes the pamphlet strong evidence of what merchants wanted, and weak evidence of what most people thought`,
        isCorrect: true,
      },
      {
        text: `It makes the pamphlet unreliable, so it should not be used`,
        misconception: "Treated having a point of view as a reason to discard a source",
      },
      {
        text: `It changes nothing — the argument stands on its own merits`,
        misconception: "Read the document as though nobody in particular wrote it",
      },
      {
        text: `It proves the tax was unpopular everywhere`,
        misconception: "Generalised one group's interest into everyone's opinion",
      },
    ],
  },
  {
    id: "q-sourcing-2",
    skillId: "sourcing-a-document",
    prompt: `What question is sourcing actually asking?`,
    options: [
      { text: `Who made this, for whom, and what did they want it to do?`, isCorrect: true },
      {
        text: `What does the document say?`,
        misconception: "Described the content, which is comprehension rather than sourcing",
      },
      {
        text: `Is what the document says true?`,
        misconception: "Went straight to a verdict without asking where the document came from",
      },
      {
        text: `When was it written?`,
        misconception: "Stopped at the date, which is part of the situation but not the purpose",
      },
    ],
  },
  {
    id: "q-sourcing-3",
    skillId: "sourcing-a-document",
    prompt:
      `Two accounts of the same strike disagree completely. One is a mill owner's letter, the other an organiser's speech.` + "\n" +
      `What is the best move?`,
    options: [
      { text: `Use each as evidence of how its side wanted the strike understood`, isCorrect: true },
      {
        text: `Use the more detailed account and set the other aside`,
        misconception: "Chose between sources by length rather than by standpoint",
      },
      {
        text: `Split the difference and report what is in the middle`,
        misconception: "Treated disagreement between sources as an arithmetic problem",
      },
      {
        text: `Discard both, since both are biased`,
        misconception: "Treated having a point of view as disqualifying",
      },
    ],
  },
  {
    id: "q-sourcing-4",
    skillId: "sourcing-a-document",
    prompt:
      `A diary entry was written privately and never meant to be read by anyone.` + "\n" +
      `What does that change?`,
    options: [
      {
        text: `It makes the entry likelier to show what the writer believed, rather than what they wanted others to think`,
        isCorrect: true,
      },
      {
        text: `Nothing — a source is a source`,
        misconception: "Ignored audience, which is half of what sourcing asks",
      },
      {
        text: `It makes the entry unusable, because it was never published`,
        misconception: "Confused private with unreliable",
      },
      {
        text: `It proves the events happened exactly as described`,
        misconception: "Read sincerity as accuracy — an honest witness can still be wrong",
      },
    ],
  },

  // ===== Placing an event in what surrounded it =====
  {
    id: "q-contextualize-1",
    skillId: "contextualize-an-event",
    prompt:
      `A prompt concerns a 1920s law restricting immigration.` + "\n" +
      `Which sentence places it in its moment?`,
    options: [
      {
        text: `It passed while wartime suspicion of foreigners and a postwar surplus of labour were both still fresh`,
        isCorrect: true,
      },
      {
        text: `The law set quotas according to country of origin`,
        misconception: "Described the law itself instead of what surrounded it",
      },
      {
        text: `Immigration has always been controversial in America`,
        misconception: "Reached for a truism instead of the specific moment",
      },
      {
        text: `The law was substantially repealed decades later`,
        misconception: "Jumped forward in time instead of placing the moment",
      },
    ],
  },
  {
    id: "q-contextualize-2",
    skillId: "contextualize-an-event",
    prompt: `What is contextualization for?`,
    options: [
      { text: `Showing what else was going on that makes this development make sense`, isCorrect: true },
      {
        text: `Summarising the period before the argument starts`,
        misconception: "Treated it as a warm-up paragraph rather than as analysis",
      },
      {
        text: `Getting as many facts from the era into the essay as possible`,
        misconception: "Substituted quantity of facts for relevance",
      },
      {
        text: `Restating what the document says in your own words`,
        misconception: "Described the document rather than the moment around it",
      },
    ],
  },
  {
    id: "q-contextualize-3",
    skillId: "contextualize-an-event",
    prompt:
      `One of these is too broad to place anything.` + "\n" +
      `Which one?`,
    options: [
      { text: `Throughout history, people have disagreed about the role of government`, isCorrect: true },
      {
        text: `Cheap western land had been drawing farm labour out of the eastern states for a decade`,
        misconception: "Read a specific placement as too broad",
      },
      {
        text: `Two years of poor harvests had already pushed food prices up across the region`,
        misconception: "Read a specific placement as too broad",
      },
      {
        text: `The previous administration had just lost a public fight over the same question`,
        misconception: "Read a specific placement as too broad",
      },
    ],
  },
  {
    id: "q-contextualize-4",
    skillId: "contextualize-an-event",
    prompt:
      `You are placing a document written in the third year of a long war.` + "\n" +
      `Which surrounding fact actually helps?`,
    options: [
      {
        text: `The war's aims had shifted that year, and the army badly needed new soldiers`,
        isCorrect: true,
      },
      {
        text: `The telegraph had been invented some years earlier`,
        misconception: "Chose a fact from the era with no bearing on the document",
      },
      {
        text: `The country had been founded the previous century`,
        misconception: "Reached back to something too distant to place the moment",
      },
      {
        text: `The war would end two years later`,
        misconception: "Used what came afterwards to explain what came before",
      },
    ],
  },

  // ===== Telling a cause apart from what merely came after =====
  {
    id: "q-causation-1",
    skillId: "causation-vs-sequence",
    prompt:
      `A tariff passed in March. A recession began in May.` + "\n" +
      `What does that timing alone justify saying?`,
    options: [
      { text: `The tariff came before the recession`, isCorrect: true },
      {
        text: `The tariff caused the recession`,
        misconception: "Read a sequence as a cause",
      },
      {
        text: `The recession caused the tariff`,
        misconception: "Assumed a cause and reversed the order as well",
      },
      {
        text: `The two had nothing to do with each other`,
        misconception: "Ruled a cause out as confidently as the others ruled it in",
      },
    ],
  },
  {
    id: "q-causation-2",
    skillId: "causation-vs-sequence",
    prompt: `Which sentence explains a cause rather than narrating one?`,
    options: [
      {
        text: `Freight rates fell far enough that shipping grain east cost less than milling it locally, and the local mills closed.`,
        isCorrect: true,
      },
      {
        text: `First the railroad reached the county, and then the mills closed.`,
        misconception: "Gave the order of events and stopped there",
      },
      {
        text: `The mills closed during the 1880s.`,
        misconception: "Gave a date where a reason was needed",
      },
      {
        text: `The railroad was one of the most important developments of the period.`,
        misconception: "Asserted importance without naming a mechanism",
      },
    ],
  },
  {
    id: "q-causation-3",
    skillId: "causation-vs-sequence",
    prompt: `A prompt begins "Explain why". What is it asking for?`,
    options: [
      { text: `A mechanism — what made the thing happen`, isCorrect: true },
      {
        text: `An account of what happened, in order`,
        misconception: "Answered the question 'what' where the prompt asked 'why'",
      },
      {
        text: `A description of how things turned out`,
        misconception: "Described the outcome rather than the cause",
      },
      {
        text: `A judgment about whether it was a good thing`,
        misconception: "Evaluated where the prompt asked for an explanation",
      },
    ],
  },
  {
    id: "q-causation-4",
    skillId: "causation-vs-sequence",
    prompt:
      `Immigration rose across the same decades that wages rose.` + "\n" +
      `Which claim is careful?`,
    options: [
      {
        text: `Both rose together, and showing that one caused the other would take more than the timing`,
        isCorrect: true,
      },
      {
        text: `Immigration pushed wages up`,
        misconception: "Turned two things happening together into one causing the other",
      },
      {
        text: `Rising wages drew the immigrants`,
        misconception: "Plausible, but the timing alone does not establish it either",
      },
      {
        text: `The two figures are unrelated`,
        misconception: "Denied a relationship the evidence does not rule out",
      },
    ],
  },

  // ---- Second wave: four more of each, so a retake draws a different sample.

  // ===== Reading a source for who wrote it and why =====
  {
    id: "q-sourcing-5",
    skillId: "sourcing-a-document",
    prompt:
      `A newspaper editorial from 1898 argues loudly for going to war.` + "\n" +
      `What is it best evidence of?`,
    options: [
      { text: `Which arguments for the war were being made publicly at the time`, isCorrect: true },
      { text: `That the war was justified`, misconception: "Took a source's position as proof that the position was right" },
      { text: `What most readers believed`, misconception: "Read a publication as a record of its audience's opinion" },
      { text: `The facts of how the war began`, misconception: "Used an argument as though it were a factual record" },
    ],
  },
  {
    id: "q-sourcing-6",
    skillId: "sourcing-a-document",
    prompt: `A government publishes a report on the success of its own programme. What is the caution?`,
    options: [
      { text: `The author is being judged by the results it is reporting`, isCorrect: true },
      { text: `Government sources are reliable, so there is none`, misconception: "Treated official as neutral" },
      { text: `Government sources are worthless and should be skipped`, misconception: "Discarded a source for having an interest" },
      { text: `Official reports are too long to use as evidence`, misconception: "Objected to the form rather than the standpoint" },
    ],
  },
  {
    id: "q-sourcing-7",
    skillId: "sourcing-a-document",
    prompt: `Which detail belongs to sourcing rather than to content?`,
    options: [
      { text: `The letter was written to a business partner, not for publication`, isCorrect: true },
      { text: `The letter mentions a delayed shipment`, misconception: "Named what the source says rather than where it came from" },
      { text: `The letter runs to two pages`, misconception: "Named a physical property of the document" },
      { text: `The letter is written in formal language`, misconception: "Named a feature of the writing rather than of the situation that produced it" },
    ],
  },
  {
    id: "q-sourcing-8",
    skillId: "sourcing-a-document",
    prompt: `Why does a source's intended audience matter?`,
    options: [
      { text: `People say different things depending on who is listening`, isCorrect: true },
      { text: `It tells you when the source was written`, misconception: "Confused audience with date" },
      { text: `It does not — only the author matters`, misconception: "Kept half of the situation and dropped the other half" },
      { text: `It tells you whether the source is true`, misconception: "Expected sourcing to settle accuracy" },
    ],
  },

  // ===== Placing an event in what surrounded it =====
  {
    id: "q-contextualize-5",
    skillId: "contextualize-an-event",
    prompt:
      `A prompt concerns a public works programme begun in the 1930s.` + "\n" +
      `Which sentence places it?`,
    options: [
      { text: `Unemployment had sat at record levels for years and private hiring had not come back`, isCorrect: true },
      { text: `The programme built roads, bridges and public buildings`, misconception: "Described the programme instead of what surrounded it" },
      { text: `Economic policy has always been a subject of disagreement`, misconception: "Reached for a truism instead of the moment" },
      { text: `The programme was expanded in later years`, misconception: "Moved forward in time instead of placing the moment" },
    ],
  },
  {
    id: "q-contextualize-6",
    skillId: "contextualize-an-event",
    prompt: `How much context is enough?`,
    options: [
      { text: `Enough to make this particular development make sense, and no more`, isCorrect: true },
      { text: `A full paragraph, every time`, misconception: "Made a rule about length rather than about relevance" },
      { text: `One sentence, every time`, misconception: "Made a rule about length rather than about relevance" },
      { text: `As much of the era as you can remember`, misconception: "Substituted recall for relevance" },
    ],
  },
  {
    id: "q-contextualize-7",
    skillId: "contextualize-an-event",
    prompt:
      `One student writes context from the same decade. Another writes context from the same century.` + "\n" +
      `Which is more likely to earn the point?`,
    options: [
      { text: `The decade — closer in time is usually closer in relevance`, isCorrect: true },
      { text: `The century, because it covers more ground`, misconception: "Read breadth as strength" },
      { text: `Neither — context is always too vague to score`, misconception: "Gave up on a point that is routinely earned" },
      { text: `Both equally, since both are true`, misconception: "Treated relevance as though only accuracy mattered" },
    ],
  },
  {
    id: "q-contextualize-8",
    skillId: "contextualize-an-event",
    prompt: `What is the difference between contextualization and sourcing?`,
    options: [
      { text: `Context is what was going on around a document; sourcing is who made it and why`, isCorrect: true },
      { text: `Context is who made it; sourcing is what was going on around it`, misconception: "Swapped the two" },
      { text: `They are two names for the same thing`, misconception: "Collapsed two different questions into one" },
      { text: `Context is the summary of the document`, misconception: "Read context as retelling the source" },
    ],
  },

  // ===== Telling a cause apart from what merely came after =====
  {
    id: "q-causation-5",
    skillId: "causation-vs-sequence",
    prompt: `Which phrase signals a cause rather than an order of events?`,
    options: [
      { text: `which meant that`, isCorrect: true },
      { text: `and then`, misconception: "Chose a phrase that only puts events in order" },
      { text: `meanwhile`, misconception: "Chose a phrase that sets events side by side" },
      { text: `afterwards`, misconception: "Chose a phrase about time" },
    ],
  },
  {
    id: "q-causation-6",
    skillId: "causation-vs-sequence",
    prompt:
      `A student writes: "The war ended, and the economy boomed."` + "\n" +
      `How do you make that a causal claim?`,
    options: [
      { text: `Name what the war's end released — spending, labour, demand — that the boom ran on`, isCorrect: true },
      { text: `Put the word "because" between the two halves`, misconception: "Asserted a cause without naming a mechanism" },
      { text: `Put the boom first in the sentence`, misconception: "Reordered the sentence instead of explaining anything" },
      { text: `Add the years to both halves`, misconception: "Added precision about time, which is the part that was never in doubt" },
    ],
  },
  {
    id: "q-causation-7",
    skillId: "causation-vs-sequence",
    prompt: `Two plausible causes are offered for one event. What is the careful move?`,
    options: [
      { text: `Weigh them — say which did more of the work, and why`, isCorrect: true },
      { text: `Choose the one that came first`, misconception: "Used order in time to settle a question about cause" },
      { text: `Say both mattered equally`, misconception: "Avoided the judgment the question was asking for" },
      { text: `Say the cause cannot be known`, misconception: "Treated a hard judgment as an impossible one" },
    ],
  },
  {
    id: "q-causation-8",
    skillId: "causation-vs-sequence",
    prompt: `What is the difference between a long-term cause and a trigger?`,
    options: [
      { text: `The long-term cause made the event possible; the trigger set off the one that happened`, isCorrect: true },
      { text: `The trigger made it possible; the long-term cause set it off`, misconception: "Swapped the two" },
      { text: `They are the same thing under two names`, misconception: "Collapsed two useful distinctions" },
      { text: `The trigger always matters more`, misconception: "Ranked causes by how close they sit to the event" },
    ],
  },
];
