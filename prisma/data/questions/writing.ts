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

  // ===== Finding what a text argues, not what it is about =====
  // The reading side of the writing chain, and what AP Language II rests on.
  // Everything above this point is about producing an argument; these are about
  // recognising one in front of you.
  {
    id: "q-read-for-the-argument-1",
    skillId: "read-for-the-argument",
    prompt:
      `A columnist writes about school start times.` + "\n" +
      `Which sentence states what the column ARGUES?`,
    options: [
      {
        text: `Start times should move later, because the inconvenience falls on adults and the harm falls on students.`,
        isCorrect: true,
      },
      {
        text: `The column is about school start times and teenage sleep.`,
        misconception: "Named the topic rather than the position taken on it",
      },
      {
        text: `The columnist discusses several studies of adolescent sleep.`,
        misconception: "Described what the writer does rather than what they claim",
      },
      {
        text: `The column is well researched and hard to argue with.`,
        misconception: "Evaluated the piece instead of stating its claim",
      },
    ],
  },
  {
    id: "q-read-for-the-argument-2",
    skillId: "read-for-the-argument",
    prompt:
      `You have read a paragraph twice and still cannot tell what it is arguing.` + "\n" +
      `Which question helps most?`,
    options: [
      { text: `What would someone who disagreed with this paragraph say?`, isCorrect: true },
      {
        text: `What is this paragraph about?`,
        misconception: "Asked for the topic, which you already had",
      },
      {
        text: `Which words does the writer keep repeating?`,
        misconception: "Went looking for style before finding the position",
      },
      {
        text: `Is the writer right?`,
        misconception: "Judged the argument before identifying it",
      },
    ],
  },
  {
    id: "q-read-for-the-argument-3",
    skillId: "read-for-the-argument",
    prompt:
      `An essay contains the sentence: "Of course, critics will say the programme costs too much."` + "\n" +
      `What is that sentence doing?`,
    options: [
      { text: `Raising the other side's objection, usually just before answering it`, isCorrect: true },
      {
        text: `Stating the author's own position`,
        misconception: "Read a concession as the author's claim",
      },
      {
        text: `Summarising the essay so far`,
        misconception: "Read a move inside the argument as a summary of it",
      },
      {
        text: `Giving evidence for the author's claim`,
        misconception: "Read an objection as support",
      },
    ],
  },
  {
    id: "q-read-for-the-argument-4",
    skillId: "read-for-the-argument",
    prompt:
      `Two sentences in a paragraph say related things. One is the claim, the other supports it.` + "\n" +
      `How do you tell which is which?`,
    options: [
      {
        text: `The support is there to make you accept the other one; the claim is what you are being asked to accept`,
        isCorrect: true,
      },
      {
        text: `The claim comes first`,
        misconception: "Used position on the page instead of what the sentence does",
      },
      {
        text: `The claim is the longer sentence`,
        misconception: "Used length instead of what the sentence does",
      },
      {
        text: `The claim is the one with the statistics in it`,
        misconception: "Mistook the evidence for the thing it supports",
      },
    ],
  },

  // ===== Telling a supported statement from a bare assertion =====
  {
    id: "q-evidence-vs-assertion-1",
    skillId: "evidence-vs-assertion",
    prompt: `Which sentence offers evidence rather than asserting?`,
    options: [
      { text: `Attendance rose from 71 to 88 percent in the two terms after the change.`, isCorrect: true },
      {
        text: `Attendance improved dramatically after the change.`,
        misconception: "Asserted the conclusion the figures were supposed to show",
      },
      {
        text: `Everyone knows attendance is better now.`,
        misconception: "Offered consensus in place of evidence",
      },
      {
        text: `It is obvious that the change worked.`,
        misconception: "Called the claim obvious instead of supporting it",
      },
    ],
  },
  {
    id: "q-evidence-vs-assertion-2",
    skillId: "evidence-vs-assertion",
    prompt: `A writer says "studies show that this works." What is missing?`,
    options: [
      { text: `Which studies, and what they actually found`, isCorrect: true },
      {
        text: `Nothing — pointing at studies is enough`,
        misconception: "Treated the gesture at evidence as the evidence",
      },
      {
        text: `A stronger word than "works"`,
        misconception: "Reached for emphasis where support was missing",
      },
      {
        text: `The writer's own view of the studies`,
        misconception: "Added a position where the gap was support",
      },
    ],
  },
  {
    id: "q-evidence-vs-assertion-3",
    skillId: "evidence-vs-assertion",
    prompt: `Which of these could be checked by a reader who disagreed with you?`,
    options: [
      { text: `The policy has been in place since 2019 in four of the six districts.`, isCorrect: true },
      {
        text: `The policy is the best option available.`,
        misconception: "Chose a judgment, which nobody can check",
      },
      {
        text: `Most people support the policy.`,
        misconception: "Chose a claim about opinion with nothing attached to it",
      },
      {
        text: `The policy is clearly working.`,
        misconception: "Chose an assertion with a confident adverb in front of it",
      },
    ],
  },
  {
    id: "q-evidence-vs-assertion-4",
    skillId: "evidence-vs-assertion",
    prompt:
      `Your claim is about students in general, and the support you have is your own experience.` + "\n" +
      `Is that evidence?`,
    options: [
      { text: `It is evidence about one case, and it cannot carry a claim about many`, isCorrect: true },
      {
        text: `Yes — personal experience is the most convincing evidence there is`,
        misconception: "Treated vividness as weight",
      },
      {
        text: `No — personal experience is never evidence`,
        misconception: "Ruled out a whole category instead of weighing what it covers",
      },
      {
        text: `Only if it is affecting enough to persuade the reader`,
        misconception: "Judged evidence by its effect rather than by what it can support",
      },
    ],
  },

  // ===== Telling a complete sentence from a fragment or a splice =====
  {
    id: "q-sentence-boundaries-1",
    skillId: "sentence-boundaries",
    prompt: `Which of these is a complete sentence?`,
    options: [
      { text: `The argument collapses.`, isCorrect: true },
      {
        text: `Although the argument collapses in the final paragraph.`,
        misconception: "A subordinate clause left standing alone — a fragment",
      },
      {
        text: `The argument collapsing in the final paragraph.`,
        misconception: "A phrase with no main verb",
      },
      {
        text: `Which is why the argument collapses.`,
        misconception: "A relative clause with nothing to attach to",
      },
    ],
  },
  {
    id: "q-sentence-boundaries-2",
    skillId: "sentence-boundaries",
    prompt: `What is wrong with: "The evidence is strong, the conclusion does not follow."`,
    options: [
      { text: `Two complete sentences joined by nothing but a comma`, isCorrect: true },
      {
        text: `Nothing — the comma is doing its job`,
        misconception: "Read a comma splice as correct",
      },
      {
        text: `The second half is a fragment`,
        misconception: "Misread a complete clause as a fragment",
      },
      {
        text: `It is too long to be one sentence`,
        misconception: "Judged by length rather than by structure",
      },
    ],
  },
  {
    id: "q-sentence-boundaries-3",
    skillId: "sentence-boundaries",
    prompt:
      `"The evidence is strong, the conclusion does not follow."` + "\n" +
      `Which repair keeps both halves and fixes the problem?`,
    options: [
      { text: `The evidence is strong, but the conclusion does not follow.`, isCorrect: true },
      {
        text: `The evidence is strong the conclusion does not follow.`,
        misconception: "Removed the comma and made a run-on",
      },
      {
        text: `The evidence is strong, however the conclusion does not follow.`,
        misconception: "Swapped in a word that still needs a semicolon before it",
      },
      {
        text: `The evidence is strong. Although the conclusion does not follow.`,
        misconception: "Fixed the splice by creating a fragment",
      },
    ],
  },
  {
    id: "q-sentence-boundaries-4",
    skillId: "sentence-boundaries",
    prompt: `Which of these is a run-on?`,
    options: [
      { text: `She read the whole book in a day she still could not write the essay.`, isCorrect: true },
      {
        text: `She read the whole book in a day; she still could not write the essay.`,
        misconception: "A semicolon joins two complete clauses correctly",
      },
      {
        text: `She read the whole book in a day, but she still could not write the essay.`,
        misconception: "A comma with a conjunction joins two clauses correctly",
      },
      {
        text: `After reading the whole book in a day, she still could not write the essay.`,
        misconception: "An introductory clause followed by a comma is correct",
      },
    ],
  },

  // ---- Second wave: four more of each, so a retake draws a different sample.

  // ===== Telling a claim apart from a summary =====
  {
    id: "q-claim-vs-summary-5",
    skillId: "claim-vs-summary",
    prompt: `Which of these could a classmate reasonably disagree with?`,
    options: [
      {
        text: `Douglass makes learning to read the moment he stops being property in his own mind.`,
        isCorrect: true,
      },
      { text: `Douglass eventually escapes to the North.`, misconception: "Chose an event from the book" },
      { text: `The Narrative runs to about a hundred pages.`, misconception: "Chose a fact about the object rather than the text" },
      { text: `Douglass is an important American writer.`, misconception: "Chose a consensus nobody in the room disputes" },
    ],
  },
  {
    id: "q-claim-vs-summary-6",
    skillId: "claim-vs-summary",
    prompt:
      `A paragraph opens: "The story begins with the narrator alone in the house."` + "\n" +
      `Which revision makes it a claim?`,
    options: [
      {
        text: `The narrator's solitude is the story's method: with nobody to contradict him, his account cannot be tested.`,
        isCorrect: true,
      },
      { text: `The story begins with the narrator alone, which is important.`, misconception: "Asserted importance instead of taking a position" },
      { text: `The story begins with the narrator alone in a dark, shuttered house.`, misconception: "Added detail, which is still a summary" },
      { text: `At the opening, the narrator is isolated from everyone else.`, misconception: "Reworded the summary without changing what it does" },
    ],
  },
  {
    id: "q-claim-vs-summary-7",
    skillId: "claim-vs-summary",
    prompt: `Which question tells you whether a sentence is a claim?`,
    options: [
      { text: `Could someone reasonably write the opposite?`, isCorrect: true },
      { text: `Is it about the text?`, misconception: "Summaries are about the text too" },
      { text: `Does it use a literary term?`, misconception: "Naming a device is not the same as arguing" },
      { text: `Is it true?`, misconception: "Summaries are true as well — that is exactly the problem with them" },
    ],
  },
  {
    id: "q-claim-vs-summary-8",
    skillId: "claim-vs-summary",
    prompt:
      `A body paragraph contains: a claim, a quotation, an explanation, and a summary of the chapter.` + "\n" +
      `Which one should come out?`,
    options: [
      { text: `The chapter summary`, isCorrect: true },
      { text: `The explanation`, misconception: "Cut the commentary, which is the part that earns the point" },
      { text: `The quotation`, misconception: "Cut the evidence the claim was resting on" },
      { text: `The claim`, misconception: "Cut the thing the rest of the paragraph exists to support" },
    ],
  },

  // ===== Writing a defensible thesis =====
  {
    id: "q-defensible-thesis-5",
    skillId: "defensible-thesis",
    prompt: `Which thesis is too broad to defend in a single essay?`,
    options: [
      { text: `American literature reflects the changing values of the nation.`, isCorrect: true },
      {
        text: `Hawthorne gives his hypocrites the best arguments, which makes the reader complicit in believing them.`,
        misconception: "This one is narrow enough to argue in one essay",
      },
      {
        text: `Chopin ends scenes one beat before the decision, so the reader supplies the motive.`,
        misconception: "This one is narrow enough to argue in one essay",
      },
      {
        text: `Poe's narrators lose the reader through precision rather than through raving.`,
        misconception: "This one is narrow enough to argue in one essay",
      },
    ],
  },
  {
    id: "q-defensible-thesis-6",
    skillId: "defensible-thesis",
    prompt: `"The novel uses light and dark imagery." What would turn that into a thesis?`,
    options: [
      { text: `Saying what the imagery does — that it makes moral judgment look like plain perception`, isCorrect: true },
      { text: `Listing more of the images`, misconception: "Added inventory rather than a position" },
      { text: `Saying the imagery is effective`, misconception: "Added evaluation rather than a position" },
      { text: `Counting how often the imagery appears`, misconception: "Gathered evidence for a claim that has not been made yet" },
    ],
  },
  {
    id: "q-defensible-thesis-7",
    skillId: "defensible-thesis",
    prompt:
      `Halfway through drafting, the evidence you keep finding supports a different reading from your thesis.` + "\n" +
      `What should you do?`,
    options: [
      { text: `Change the thesis to the one the evidence actually supports`, isCorrect: true },
      { text: `Leave the evidence out`, misconception: "Protected the thesis from the text" },
      { text: `Add the second reading as a second thesis`, misconception: "Split one essay into two arguments" },
      { text: `Mention the second reading in the conclusion`, misconception: "Noted the contradiction instead of resolving it" },
    ],
  },
  {
    id: "q-defensible-thesis-8",
    skillId: "defensible-thesis",
    prompt: `Which of these is defensible?`,
    options: [
      {
        text: `Dickinson's near-rhymes fail on purpose, so that agreement in her poems always sounds slightly forced.`,
        isCorrect: true,
      },
      { text: `Dickinson wrote a great many poems about death.`, misconception: "Chose a countable fact" },
      { text: `Dickinson's poems are short.`, misconception: "Chose a description of the object" },
      { text: `Dickinson is widely admired today.`, misconception: "Chose a claim about reputation rather than about the poems" },
    ],
  },

  // ===== Selecting and integrating textual evidence =====
  {
    id: "q-integrate-evidence-5",
    skillId: "integrate-evidence",
    prompt: `Which sentence makes the quotation part of its own grammar?`,
    options: [
      {
        text: `The narrator's insistence that he is "not mad" arrives before anyone has accused him of anything.`,
        isCorrect: true,
      },
      { text: `"I am not mad." That is what the narrator says.`, misconception: "Set the quotation down and then pointed at it" },
      { text: `The narrator gives us this quote: "I am not mad."`, misconception: "Announced a quotation instead of using one" },
      { text: `According to the quote, the narrator is not mad.`, misconception: "Paraphrased the quotation and kept the word quote" },
    ],
  },
  {
    id: "q-integrate-evidence-6",
    skillId: "integrate-evidence",
    prompt:
      `Your claim is that a character is lying.` + "\n" +
      `Which evidence is strongest?`,
    options: [
      { text: `A line where what they say contradicts something the reader has already seen`, isCorrect: true },
      { text: `A line where another character calls them a liar`, misconception: "Chose someone's assertion over the text's own demonstration" },
      { text: `A long description of how they look while speaking`, misconception: "Chose vividness over relevance" },
      { text: `A line where they seem nervous`, misconception: "Chose an impression rather than evidence" },
    ],
  },
  {
    id: "q-integrate-evidence-7",
    skillId: "integrate-evidence",
    prompt: `How much of a passage should you quote?`,
    options: [
      { text: `The part that does the work your claim needs`, isCorrect: true },
      { text: `As much as you can fit`, misconception: "Treated quantity of evidence as strength" },
      { text: `A single word, always`, misconception: "Made a rule about length instead of about function" },
      { text: `A complete sentence, always`, misconception: "Made a rule about grammar instead of about function" },
    ],
  },
  {
    id: "q-integrate-evidence-8",
    skillId: "integrate-evidence",
    prompt:
      `A quotation is followed straight away by the next claim, with nothing in between.` + "\n" +
      `What is missing?`,
    options: [
      { text: `The commentary that explains how the quotation supports the claim`, isCorrect: true },
      { text: `A citation`, misconception: "Named a formatting need instead of the reasoning gap" },
      { text: `A longer quotation`, misconception: "Added evidence where explanation was missing" },
      { text: `A transition word`, misconception: "Named a connector where reasoning was missing" },
    ],
  },

  // ===== Writing commentary instead of restating =====
  {
    id: "q-commentary-5",
    skillId: "commentary-not-restatement",
    prompt:
      `Evidence: a character says "I am content" three separate times in one scene.` + "\n" +
      `Which sentence is commentary?`,
    options: [
      {
        text: `The repetition turns contentment into something she has to keep saying, which is what people do with things they do not feel.`,
        isCorrect: true,
      },
      { text: `She says that she is content three times.`, misconception: "Restated the evidence" },
      { text: `This shows that she is content.`, misconception: "Took the line at face value and called that analysis" },
      { text: `Repetition is a common device in fiction.`, misconception: "Defined the device instead of reading it" },
    ],
  },
  {
    id: "q-commentary-6",
    skillId: "commentary-not-restatement",
    prompt: `In "explain HOW the evidence proves the claim", what does "how" ask for?`,
    options: [
      { text: `The mechanism — what the evidence does that makes the claim follow`, isCorrect: true },
      { text: `The method the author used to write the passage`, misconception: "Read 'how' as a question about the author's process" },
      { text: `How you found the quotation`, misconception: "Read 'how' as a question about your research" },
      { text: `How the passage makes the reader feel`, misconception: "Read 'how' as a question about effect on you rather than about the argument" },
    ],
  },
  {
    id: "q-commentary-7",
    skillId: "commentary-not-restatement",
    prompt: `A student writes: "The dark imagery creates a dark mood." What is wrong with it?`,
    options: [
      { text: `It explains the device with the device — nothing new has been said`, isCorrect: true },
      { text: `It is too short to be commentary`, misconception: "Judged by length rather than by what the sentence does" },
      { text: `"Dark" is the wrong word for the mood`, misconception: "Objected to the vocabulary rather than the circularity" },
      { text: `It needs a quotation in front of it`, misconception: "Added evidence where the reasoning was the gap" },
    ],
  },
  {
    id: "q-commentary-8",
    skillId: "commentary-not-restatement",
    prompt:
      `Evidence: a description puts the reader in the room before the character decides.` + "\n" +
      `Which sentence earns the commentary point?`,
    options: [
      {
        text: `Placing us there first makes the decision feel like something we were present for rather than something we were told about.`,
        isCorrect: true,
      },
      { text: `This description is very powerful.`, misconception: "Asserted an effect without explaining how it is produced" },
      { text: `The author uses descriptive imagery here.`, misconception: "Named the device without its effect" },
      { text: `The reader can see the room clearly.`, misconception: "Described the effect at the level of the picture and stopped" },
    ],
  },

  // ===== Finding what a text argues =====
  {
    id: "q-read-for-the-argument-5",
    skillId: "read-for-the-argument",
    prompt: `Which sentence in a paragraph is most likely to be the claim?`,
    options: [
      { text: `The one the other sentences are there to make you believe`, isCorrect: true },
      { text: `The first one`, misconception: "Used position on the page instead of function" },
      { text: `The longest one`, misconception: "Used length instead of function" },
      { text: `The one containing a quotation`, misconception: "Mistook the evidence for the claim it supports" },
    ],
  },
  {
    id: "q-read-for-the-argument-6",
    skillId: "read-for-the-argument",
    prompt:
      `An article spends two paragraphs describing a problem and one proposing a fix.` + "\n" +
      `What is it arguing?`,
    options: [
      { text: `That the fix is worth adopting — the description is the case for it`, isCorrect: true },
      { text: `That the problem is serious`, misconception: "Took the setup for the point" },
      { text: `Nothing — it is an informative piece`, misconception: "Read an argument as information because it contains facts" },
      { text: `Both equally, since more space goes to the problem`, misconception: "Measured the argument by word count" },
    ],
  },
  {
    id: "q-read-for-the-argument-7",
    skillId: "read-for-the-argument",
    prompt: `A writer says: "It is not that the policy is expensive, but that it is aimed at the wrong people." What is the claim?`,
    options: [
      { text: `That the policy is aimed at the wrong people`, isCorrect: true },
      { text: `That the policy is expensive`, misconception: "Took the position being rejected for the claim" },
      { text: `Both halves equally`, misconception: "Missed that the first half is being set aside" },
      { text: `Neither — the sentence only sets up`, misconception: "Read a claim as a preamble" },
    ],
  },
  {
    id: "q-read-for-the-argument-8",
    skillId: "read-for-the-argument",
    prompt:
      `You are sure you disagree with an article, but you cannot say what you disagree with.` + "\n" +
      `What does that tell you?`,
    options: [
      { text: `You have not found its claim yet`, isCorrect: true },
      { text: `The article does not make a claim`, misconception: "Blamed the text for a gap in the reading" },
      { text: `You disagree with the topic rather than the article`, misconception: "Confused the subject with the position taken on it" },
      { text: `The article is badly written`, misconception: "Turned a reading difficulty into a judgment about the writer" },
    ],
  },

  // ===== Telling a supported statement from a bare assertion =====
  {
    id: "q-evidence-vs-assertion-5",
    skillId: "evidence-vs-assertion",
    prompt: `Which of these needs support before a reader should accept it?`,
    options: [
      { text: `The new schedule has improved student outcomes.`, isCorrect: true },
      { text: `The schedule changed at the start of September.`, misconception: "Chose a checkable fact" },
      { text: `The day now begins at 8:40.`, misconception: "Chose a checkable fact" },
      { text: `There are six periods in the day.`, misconception: "Chose a checkable fact" },
    ],
  },
  {
    id: "q-evidence-vs-assertion-6",
    skillId: "evidence-vs-assertion",
    prompt: `A writer gives a precise number and no source. Is that evidence?`,
    options: [
      { text: `Only as far as the reader trusts the writer — unsourced, it cannot be checked`, isCorrect: true },
      { text: `Yes — a number is evidence by definition`, misconception: "Treated the form of evidence as the substance of it" },
      { text: `No — numbers are never evidence on their own`, misconception: "Ruled out a whole category instead of asking where it came from" },
      { text: `Only if the number is large`, misconception: "Judged evidence by size rather than by whether it can be checked" },
    ],
  },
  {
    id: "q-evidence-vs-assertion-7",
    skillId: "evidence-vs-assertion",
    prompt: `What makes a source stronger for a claim people dispute?`,
    options: [
      { text: `That someone who disagrees with you would still accept it`, isCorrect: true },
      { text: `That it agrees with your conclusion`, misconception: "Chose the source by the answer it gives" },
      { text: `That it is recent`, misconception: "Took one useful property and made it the whole test" },
      { text: `That it is long and detailed`, misconception: "Took length for authority" },
    ],
  },
  {
    id: "q-evidence-vs-assertion-8",
    skillId: "evidence-vs-assertion",
    prompt: `"Nine out of ten students prefer the new system." What would you want to know?`,
    options: [
      { text: `Who was asked, how many of them, and by whom`, isCorrect: true },
      { text: `Nothing — it is a statistic`, misconception: "Treated a number as supporting itself" },
      { text: `Whether ten students is enough`, misconception: "Asked about one part of it and stopped" },
      { text: `What the tenth student thought`, misconception: "Asked a question that does not test the claim" },
    ],
  },

  // ===== Telling a complete sentence from a fragment or a splice =====
  {
    id: "q-sentence-boundaries-5",
    skillId: "sentence-boundaries",
    prompt: `Which of these is a fragment?`,
    options: [
      { text: `Because the evidence arrived too late.`, isCorrect: true },
      { text: `The evidence arrived too late.`, misconception: "This one has a subject and a verb and stands alone" },
      { text: `It arrived late.`, misconception: "This one is short but complete" },
      { text: `The evidence, which arrived late, changed nothing.`, misconception: "This one carries a clause in the middle but is complete" },
    ],
  },
  {
    id: "q-sentence-boundaries-6",
    skillId: "sentence-boundaries",
    prompt: `Repair: "The essay is strong it needs a conclusion."`,
    options: [
      { text: `The essay is strong, but it needs a conclusion.`, isCorrect: true },
      { text: `The essay is strong, it needs a conclusion.`, misconception: "Replaced a run-on with a comma splice" },
      { text: `The essay is strong; needs a conclusion.`, misconception: "Left the second half without a subject" },
      { text: `The essay is strong. Needing a conclusion.`, misconception: "Fixed the run-on by creating a fragment" },
    ],
  },
  {
    id: "q-sentence-boundaries-7",
    skillId: "sentence-boundaries",
    prompt: `Which sentence joins its two halves correctly?`,
    options: [
      { text: `She finished the draft; the argument still needs work.`, isCorrect: true },
      { text: `She finished the draft, the argument still needs work.`, misconception: "Joined two complete clauses with only a comma" },
      { text: `She finished the draft the argument still needs work.`, misconception: "Ran two complete clauses together with nothing between them" },
      { text: `She finished the draft. Although the argument still needs work.`, misconception: "Left a subordinate clause standing on its own" },
    ],
  },
  {
    id: "q-sentence-boundaries-8",
    skillId: "sentence-boundaries",
    prompt: `Which one uses the semicolon correctly?`,
    options: [
      { text: `The data is clear; the conclusion is not.`, isCorrect: true },
      { text: `The data is clear; which the conclusion is not.`, misconception: "Put a fragment after the semicolon" },
      { text: `Although the data is clear; the conclusion is not.`, misconception: "Used a semicolon inside a single sentence" },
      { text: `The data is clear; and the conclusion is not.`, misconception: "Used a semicolon where the conjunction wanted a comma" },
    ],
  },
];
