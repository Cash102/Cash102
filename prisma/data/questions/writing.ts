/**
 * WRITING — the four skill chains under AP Literature I.
 *
 * TODO: confirm with an AP Lit teacher before these go in front of students.
 *
 * These are the hard ones to write, and the reason the schema has a chainType
 * at all. A content question has a right answer a student either knows or does
 * not. A skill question has a BEST answer, and its value is in the distractors:
 * each wrong option is a specific move a real student makes — summarising
 * instead of arguing, dropping a quote instead of embedding it, naming a theme
 * instead of explaining how the evidence produces it. The misconception on each
 * option is what lets the report say which move this student made rather than
 * just that they missed it. A distractor with no nameable error behind it does
 * not belong in this file.
 *
 * Every text referenced is public domain — Poe, Douglass, Hawthorne, Whitman,
 * Dickinson, Chopin — and quoted only in fragments, so the bank can ship
 * without a rights question. The options are student sentences, written for
 * this file: what is being judged is the writing, not the literature.
 */

import type { SeedQuestion } from "./types";

export const WRITING_QUESTIONS: SeedQuestion[] = [
  // ===== Telling a claim apart from a summary =====
  {
    id: "q-claim-vs-summary-1",
    skillId: "claim-vs-summary",
    prompt: `Which sentence makes a claim rather than reporting?`,
    options: [
      {
        text: `Douglass presents literacy as dangerous to slaveholders precisely because it is liberating.`,
        isCorrect: true,
      },
      {
        text: `Douglass learns to read from the boys in the street after his mistress is made to stop teaching him.`,
        misconception: "Chose a report of what happens in the text",
      },
      {
        text: `The Narrative was published in 1845 and sold well in its first year.`,
        misconception: "Chose a fact about the book rather than an argument about it",
      },
      {
        text: `Douglass writes about his experience of slavery very powerfully.`,
        misconception: "Chose praise, which is a judgment of quality, not a position about the text",
      },
    ],
  },
  {
    id: "q-claim-vs-summary-2",
    skillId: "claim-vs-summary",
    prompt:
      `Three of these argue. One only reports, in argumentative-sounding language.` + "\n" +
      `Which one only reports?`,
    options: [
      {
        text: `Chopin uses the swimming scene to show that Edna swims further out than she has before.`,
        isCorrect: true,
      },
      {
        text: `Chopin makes the sea a place where Edna's isolation turns into freedom rather than punishment.`,
        misconception: "Read an argument as a report: this one claims the isolation becomes freedom",
      },
      {
        text: `Chopin withholds Edna's thoughts at the moments she is most decided, so that her choices arrive without explanation.`,
        misconception: "Read an argument as a report: this one takes a position on how the narration works",
      },
      {
        text: `Chopin lets the minor characters speak in the language Edna is refusing, which turns ordinary conversation into pressure.`,
        misconception: "Read an argument as a report: this one claims an effect the text never states",
      },
    ],
  },
  {
    id: "q-claim-vs-summary-3",
    skillId: "claim-vs-summary",
    prompt:
      `A body paragraph opens: "Next, the narrator describes the old man's eye in detail."` + "\n" +
      `What is wrong with that as a topic sentence?`,
    options: [
      {
        text: `It announces what happens next instead of what the paragraph will argue`,
        isCorrect: true,
      },
      {
        text: `Nothing — a topic sentence should orient the reader in the plot`,
        misconception: "Treats orienting the reader in the plot as the job of a topic sentence",
      },
      {
        text: `It is too short to open a paragraph`,
        misconception: "Judged the sentence by its length rather than by what it does",
      },
      {
        text: `It should name the literary device being used`,
        misconception: "Swapped one label for another — naming a device is not an argument either",
      },
    ],
  },
  {
    id: "q-claim-vs-summary-4",
    skillId: "claim-vs-summary",
    prompt: `Which revision turns "The poem is about death" into a claim?`,
    options: [
      {
        text: `The poem treats death as a courteous escort, which makes its arrival feel like an invitation rather than an end.`,
        isCorrect: true,
      },
      {
        text: `The poem is about death and immortality.`,
        misconception: "Added a second topic, which is not the same as taking a position",
      },
      {
        text: `The poem is about death, as many critics have noted.`,
        misconception: "Added authority rather than an argument",
      },
      {
        text: `The poem is about death, and it handles the subject in a fascinating way.`,
        misconception: "Added evaluation rather than a position someone could dispute",
      },
    ],
  },

  // ===== Writing a defensible thesis =====
  {
    id: "q-defensible-thesis-1",
    skillId: "defensible-thesis",
    prompt: `Which of these is defensible — that is, which could a reasonable reader disagree with?`,
    options: [
      {
        text: `Hawthorne makes the scaffold the one place his characters stop lying, so public shame becomes the novel's only honest setting.`,
        isCorrect: true,
      },
      {
        text: `The Scarlet Letter is set in Puritan Boston and follows Hester Prynne after her sentence.`,
        misconception: "Chose a statement of fact — there is nothing in it to disagree with",
      },
      {
        text: `The Scarlet Letter is a powerful novel that everyone should read.`,
        misconception: "Chose a preference, which is about the reader rather than the text",
      },
      {
        text: `The Scarlet Letter uses symbolism throughout.`,
        misconception: "Named a technique without saying what it does — nothing to argue with yet",
      },
    ],
  },
  {
    id: "q-defensible-thesis-2",
    skillId: "defensible-thesis",
    prompt:
      `A thesis reads: "This essay will discuss three symbols in the novel."` + "\n" +
      `What is the problem with it?`,
    options: [
      { text: `It announces a plan instead of taking a position`, isCorrect: true },
      {
        text: `It names three symbols instead of one`,
        misconception: "Counted the parts rather than looking for the missing argument",
      },
      {
        text: `It refers to itself as an essay`,
        misconception: "Objected to the wording rather than to the missing argument",
      },
      {
        text: `Nothing — a thesis should tell the reader what is coming`,
        misconception: "Treats a roadmap as a thesis",
      },
    ],
  },
  {
    id: "q-defensible-thesis-3",
    skillId: "defensible-thesis",
    prompt:
      `One of these would be almost impossible to argue against, which is what makes it the weakest thesis.` + "\n" +
      `Which one?`,
    options: [
      { text: `Death is an important theme in American literature.`, isCorrect: true },
      {
        text: `Dickinson's dashes break her lines where a conclusion would fall, so her poems keep refusing to arrive anywhere.`,
        misconception: "Read an arguable claim as an obvious one: a reader could deny the dashes do that",
      },
      {
        text: `Whitman's lists flatten the difference between people, so his democracy costs the reader the individual.`,
        misconception: "Read an arguable claim as an obvious one: the cost it names is a position, not a given",
      },
      {
        text: `Poe's narrators lose the reader's trust through precision rather than through raving.`,
        misconception: "Read an arguable claim as an obvious one: it picks a side on how the unreliability works",
      },
    ],
  },
  {
    id: "q-defensible-thesis-4",
    skillId: "defensible-thesis",
    prompt:
      `Your thesis: "Whitman's catalogues make the individual and the nation impossible to tell apart."` + "\n" +
      `Which body paragraph serves that thesis?`,
    options: [
      {
        text: `One showing that a long list of workers ends without singling any of them out`,
        isCorrect: true,
      },
      {
        text: `One summarising Whitman's life and the publication of the book`,
        misconception: "Left the argument for biography",
      },
      {
        text: `One describing how long the poem is and how the lines are laid out`,
        misconception: "Described the text instead of serving the claim",
      },
      {
        text: `One arguing that Whitman was the first modern American poet`,
        misconception: "Advanced a different argument than the thesis — a good paragraph for another essay",
      },
    ],
  },

  // ===== Selecting and integrating textual evidence =====
  {
    id: "q-integrate-evidence-1",
    skillId: "integrate-evidence",
    prompt: `Which sentence embeds the quotation rather than dropping it in?`,
    options: [
      {
        text: `When the narrator insists that he is "not mad", the denial itself becomes the first symptom.`,
        isCorrect: true,
      },
      {
        text: `"I am not mad." This shows that the narrator is unreliable.`,
        misconception: "Dropped the quotation as its own sentence, then labelled it from outside",
      },
      {
        text: `The narrator gives a quote about being mad.`,
        misconception: "Referred to a quotation without ever giving it",
      },
      {
        text: `In the text it states, "I am not mad."`,
        misconception: "Introduced the quotation with a phrase that says nothing about it",
      },
    ],
  },
  {
    id: "q-integrate-evidence-2",
    skillId: "integrate-evidence",
    prompt:
      `Your claim is that the sea offers Edna freedom rather than escape.` + "\n" +
      `Which quotation actually supports that claim?`,
    options: [
      {
        text: `A line where the water is called inviting and the swim is something she chooses`,
        isCorrect: true,
      },
      {
        text: `A line describing the heat of that afternoon`,
        misconception: "Chose a quotation from the right scene that does not touch the claim",
      },
      {
        text: `A line where another character describes what Edna is wearing`,
        misconception: "Chose a vivid quotation that argues nothing",
      },
      {
        text: `A line establishing the year in which the novel takes place`,
        misconception: "Chose context rather than evidence",
      },
    ],
  },
  {
    id: "q-integrate-evidence-3",
    skillId: "integrate-evidence",
    prompt:
      `A paragraph runs: one sentence of claim, eight lines of quotation, one sentence after it.` + "\n" +
      `What is wrong with it?`,
    options: [
      {
        text: `The evidence has crowded out the commentary that has to explain it`,
        isCorrect: true,
      },
      {
        text: `The quotation is not cited`,
        misconception: "Named a formatting problem instead of the structural one",
      },
      {
        text: `Nothing — more evidence makes a paragraph stronger`,
        misconception: "Treats the amount of evidence as the measure of strength",
      },
      {
        text: `The claim should come after the evidence, not before it`,
        misconception: "Reordered the paragraph instead of fixing the imbalance",
      },
    ],
  },
  {
    id: "q-integrate-evidence-4",
    skillId: "integrate-evidence",
    prompt: `What is the strongest way to introduce a quotation?`,
    options: [
      { text: `Say what the quotation is doing before you give it`, isCorrect: true },
      {
        text: `Open with "This quote shows"`,
        misconception: "Used a stock phrase that announces evidence without framing it",
      },
      {
        text: `Open with "In the text it says"`,
        misconception: "Located the quotation instead of framing it",
      },
      {
        text: `Give the quotation first and explain it afterwards`,
        misconception: "Left the reader to work out why the quotation is there",
      },
    ],
  },

  // ===== Writing commentary instead of restating =====
  {
    id: "q-commentary-1",
    skillId: "commentary-not-restatement",
    prompt:
      `Evidence: the narrator calls the old man's eye vulture-like.` + "\n" +
      `Which sentence is commentary rather than restatement?`,
    options: [
      {
        text: `The comparison turns the old man into prey, which lets the narrator recast murder as something closer to hunting.`,
        isCorrect: true,
      },
      {
        text: `The narrator says the eye looks like a vulture's eye.`,
        misconception: "Restated the evidence in different words",
      },
      {
        text: `This shows that the narrator dislikes the eye.`,
        misconception: "Restated the evidence with a label attached to it",
      },
      {
        text: `Vultures are scavenging birds associated with death.`,
        misconception: "Explained the image itself rather than what it does in the sentence",
      },
    ],
  },
  {
    id: "q-commentary-2",
    skillId: "commentary-not-restatement",
    prompt:
      `Claim: Hawthorne makes the forest the only place his characters speak freely.` + "\n" +
      `Evidence: Hester takes off the letter once they are among the trees.` + "\n" +
      `Which sentence connects the two?`,
    options: [
      {
        text: `Taking the letter off where no one can see makes honesty a thing the town has to be left in order to have.`,
        isCorrect: true,
      },
      {
        text: `In the forest, Hester removes the scarlet letter from her dress.`,
        misconception: "Restated the evidence instead of explaining it",
      },
      {
        text: `This shows the theme of freedom.`,
        misconception: "Named a theme instead of showing how the evidence produces it",
      },
      {
        text: `Hawthorne often sets important scenes outdoors.`,
        misconception: "Generalised about the author instead of reading this evidence",
      },
    ],
  },
  {
    id: "q-commentary-3",
    skillId: "commentary-not-restatement",
    prompt:
      `A paragraph ends: "This shows the theme of isolation."` + "\n" +
      `Why does that sentence not earn the commentary point?`,
    options: [
      {
        text: `It names a theme instead of explaining how the evidence produces it`,
        isCorrect: true,
      },
      {
        text: `It is too short to count as commentary`,
        misconception: "Judged the sentence by its length rather than by what it does",
      },
      {
        text: `It uses the word "shows"`,
        misconception: "Objected to the verb rather than to the missing reasoning",
      },
      {
        text: `It does not name the author`,
        misconception: "Added attribution where reasoning was missing",
      },
    ],
  },
  {
    id: "q-commentary-4",
    skillId: "commentary-not-restatement",
    prompt:
      `Evidence: the poem's dashes cut its lines off mid-thought.` + "\n" +
      `Which sentence ties the device to meaning?`,
    options: [
      {
        text: `The interruptions make the speaker's certainty collapse before any of it can finish arriving.`,
        isCorrect: true,
      },
      {
        text: `The poet uses a great many dashes in this poem.`,
        misconception: "Named the device without saying what it does",
      },
      {
        text: `A dash is a punctuation mark used for emphasis or interruption.`,
        misconception: "Defined the device instead of reading it",
      },
      {
        text: `The dashes make the poem look modern on the page.`,
        misconception: "Described how the text appears rather than what it means",
      },
    ],
  },
];
