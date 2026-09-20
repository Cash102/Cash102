/**
 * SKILL LAYER — the part the catalog does not have, and the actual product.
 *
 * Three tables:
 *   SKILLS              canonical, course-neutral. One row per skill, school-wide.
 *   COURSE_SKILLS       one course leaning on one skill: weight, chain, practice.
 *   SKILL_DEPENDENCIES  prerequisite -> dependent edges between canonical skills.
 *
 * IDS CHANGED FROM THE FIRST DRAFT. The original ids were course-prefixed
 * ("calc-factor"), which stops making sense once a skill is canonical: the
 * factoring row will be linked from Chemistry and Physics too, and the headline
 * report — "these middle school skills are load-bearing across the school and
 * no course teaches them" — reads wrong if the row calls itself calc-anything.
 * The mapping is recorded next to each skill.
 *
 * chainType "content" = you cannot do the later thing without knowing the
 *   earlier thing. Math and science.
 * chainType "skill"   = the gap is procedural, not factual. English and history.
 *   Nobody fails AP Lit because they forgot a fact.
 *
 * `origin` points at middle school for most math and science skills, and
 * originCourseCode is therefore null. That null IS the finding: HSLA has no HS
 * algebra course, so those skills are never formally retaught.
 */

import type { ChainType } from "./catalog";

export interface CanonicalSkill {
  id: string;
  name: string;
  chainType: ChainType;
  /** Verbatim human label for where the skill is taught. */
  origin: string;
  /** Catalog code when `origin` is a real course; null when it is not — that is the gap. */
  originCourseCode: string | null;
}

export interface CourseSkillLink {
  courseCode: string;
  skillId: string;
  /** 1-5, how much of THIS course depends on the skill. */
  weight: number;
  /** Broken skill -> ... -> the topic it blocks IN THIS COURSE. */
  chain: string[];
  practiceQuery: string;
  practiceUrl?: string;
}

export interface SkillEdge {
  prerequisiteId: string;
  dependentId: string;
  /** 1-5, how completely the dependent fails when the prerequisite is weak. */
  strength: number;
  rationale: string;
}

// ---------------------------------------------------------------------------
// CANONICAL SKILLS
// ---------------------------------------------------------------------------

export const SKILLS: CanonicalSkill[] = [
  // ===== Algebra foundation. Nothing in the high school teaches these. =====
  { id: "solve-for-constant", // was calc-param
    name: "Solving an equation for an unknown constant",
    chainType: "content", origin: "Middle school algebra", originCourseCode: null },

  { id: "set-expressions-equal", // was calc-setequal
    name: "Setting two expressions equal to each other",
    chainType: "content", origin: "Middle school algebra", originCourseCode: null },

  { id: "strict-vs-inclusive-inequalities", // was calc-boundary
    name: "Reading strict vs. inclusive inequalities",
    chainType: "content", origin: "Middle school algebra", originCourseCode: null },

  { id: "substitute-value", // was calc-substitute
    name: "Substituting a value into an expression",
    chainType: "content", origin: "Middle school algebra", originCourseCode: null },

  { id: "factoring-quadratics", // was calc-factor
    name: "Factoring quadratics",
    chainType: "content", origin: "Middle school algebra", originCourseCode: null },

  // ===== Taught inside the catalog. =====
  { id: "evaluate-piecewise", // was calc-piecewise
    name: "Evaluating a piecewise function at a point",
    chainType: "content", origin: "AP Precalculus", originCourseCode: "MPFYHAR" },

  { id: "simplify-rational-expressions", // was calc-rational
    name: "Simplifying rational expressions",
    chainType: "content", origin: "AP Precalculus", originCourseCode: "MPFYHAR" },

  // ===== Quantitative science foundation. Also taught nowhere in the HS. =====
  // TODO: confirm with an AP Bio teacher before shipping.
  { id: "ratios-and-proportions", // was bio-ratio
    name: "Ratios, proportions, and percentages",
    chainType: "content", origin: "Middle school math", originCourseCode: null },

  { id: "read-graphs", // was bio-graph
    name: "Reading and interpreting graphs",
    chainType: "content", origin: "Middle school science", originCourseCode: null },

  { id: "scientific-notation", // was bio-scinotation
    name: "Scientific notation and unit conversion",
    chainType: "content", origin: "Middle school science", originCourseCode: null },

  { id: "bonding-and-polarity", // was bio-chem
    name: "Basic chemical bonding and polarity",
    chainType: "content", origin: "Middle school science", originCourseCode: null },

  // ===== Writing. Skill chains: questions here must test judgment, not recall. =====
  // TODO: confirm with an AP Lit teacher before shipping.
  { id: "claim-vs-summary", // was lit-claim
    name: "Telling a claim apart from a summary",
    chainType: "skill", origin: "AP Language and Composition II", originCourseCode: "ELFYLAC2" },

  { id: "defensible-thesis", // was lit-thesis
    name: "Writing a defensible thesis",
    chainType: "skill", origin: "AP Language and Composition II", originCourseCode: "ELFYLAC2" },

  { id: "integrate-evidence", // was lit-evidence
    name: "Selecting and integrating textual evidence",
    chainType: "skill", origin: "AP Language and Composition II", originCourseCode: "ELFYLAC2" },

  { id: "commentary-not-restatement", // was lit-commentary
    name: "Writing commentary instead of restating",
    chainType: "skill", origin: "AP Language and Composition II", originCourseCode: "ELFYLAC2" },

  // ===== History. Skill chains, and the prerequisites UNDER the College =====
  // Board's historical thinking skills rather than the skills themselves. The
  // framework says a student must source a document and contextualise it; this
  // layer is what a student needs before they can. Same relationship the
  // catalog has to the skill layer everywhere else in this file.
  // TODO: confirm with an APUSH teacher.
  { id: "sourcing-a-document",
    name: "Reading a source for who wrote it and why",
    chainType: "skill", origin: "Middle school social studies", originCourseCode: null },

  { id: "contextualize-an-event",
    name: "Placing an event in what surrounded it",
    chainType: "skill", origin: "Middle school social studies", originCourseCode: null },

  { id: "causation-vs-sequence",
    name: "Telling a cause apart from what merely came after",
    chainType: "skill", origin: "Middle school social studies", originCourseCode: null },

  // ===== Computing. Content chains: the arithmetic and logic under CS =====
  // Principles, which the course itself assumes and does not teach.
  // TODO: confirm with the CS teacher.
  { id: "number-bases",
    name: "Binary and place value",
    chainType: "content", origin: "Middle school math", originCourseCode: null },

  { id: "boolean-logic",
    name: "Deciding whether a condition is true",
    chainType: "content", origin: "Middle school math", originCourseCode: null },

  { id: "trace-a-procedure",
    name: "Following a written procedure exactly",
    chainType: "content", origin: "Middle school math", originCourseCode: null },

  // ===== Economics and data. The distinction every econ student loses. =====
  // TODO: confirm with the AP Macro teacher.
  { id: "percent-change-vs-level",
    name: "Telling a rate of change apart from a level",
    chainType: "content", origin: "Middle school math", originCourseCode: null },

  // ===== What AP Language II itself rests on =====
  // Lang II is where claim-vs-summary, defensible-thesis, integrate-evidence
  // and commentary-not-restatement are TAUGHT — it is their originCourseCode.
  // So it cannot lean on them: a ninth grader arriving in that room is not
  // expected to have them yet, and a report telling them "last taught in AP
  // Language and Composition II" about the course they are sitting in would be
  // nonsense. What Lang II rests on is the layer below, which nobody in the
  // building teaches either.
  // TODO: confirm with an AP Lang teacher.
  { id: "read-for-the-argument",
    name: "Finding what a text argues, not what it is about",
    chainType: "skill", origin: "Middle school English", originCourseCode: null },

  { id: "evidence-vs-assertion",
    name: "Telling a supported statement from a bare assertion",
    chainType: "skill", origin: "Middle school English", originCourseCode: null },

  { id: "sentence-boundaries",
    name: "Telling a complete sentence from a fragment or a splice",
    chainType: "content", origin: "Middle school English", originCourseCode: null },
];

// ---------------------------------------------------------------------------
// COURSE -> SKILL LINKS
//
// No longer 1:1 with SKILLS: AP Chemistry and AP Physics C link to skills that
// Biology and Calculus already own, and inherit their questions for free. That
// is the whole return on making Skill canonical — a new course costs chain text
// and weights, not an item bank.
// ---------------------------------------------------------------------------

export const COURSE_SKILLS: CourseSkillLink[] = [
  // ===== AP CALCULUS BC I =====
  { courseCode: "MCFYHAR", skillId: "solve-for-constant", weight: 5,
    chain: ["Solve an equation for a letter that isn't x",
            "Match the two one-sided limits at a break point",
            "Find the constant that makes a piecewise function continuous"],
    practiceQuery: "solving equations for a variable" },

  { courseCode: "MCFYHAR", skillId: "set-expressions-equal", weight: 5,
    chain: ["Set expression A equal to expression B",
            "Write the continuity condition at the break point",
            "Solve continuity problems with an unknown constant"],
    practiceQuery: "setting up equations" },

  { courseCode: "MCFYHAR", skillId: "strict-vs-inclusive-inequalities", weight: 4,
    chain: ["Tell < apart from ≤ in a domain",
            "Know which piece actually defines f(a)",
            "Check whether f(a) equals the limit"],
    practiceQuery: "inequalities and interval notation" },

  { courseCode: "MCFYHAR", skillId: "evaluate-piecewise", weight: 4,
    chain: ["Pick the correct piece for a given x",
            "Compute f(a) at the break point",
            "Verify the third condition of continuity"],
    practiceQuery: "evaluating piecewise functions" },

  { courseCode: "MCFYHAR", skillId: "substitute-value", weight: 4,
    chain: ["Substitute carefully, signs and exponents included",
            "Evaluate each one-sided limit",
            "Compare the left and right limits"],
    practiceQuery: "evaluating expressions substitution" },

  { courseCode: "MCFYHAR", skillId: "factoring-quadratics", weight: 3,
    chain: ["Factor a quadratic into two binomials",
            "Cancel the shared factor in a rational expression",
            "Identify a removable discontinuity"],
    practiceQuery: "factoring quadratics" },

  { courseCode: "MCFYHAR", skillId: "simplify-rational-expressions", weight: 3,
    chain: ["Cancel a common factor from top and bottom",
            "Resolve a limit that first looks like 0/0",
            "Tell removable from non-removable discontinuities"],
    practiceQuery: "simplifying rational expressions" },

  // ===== AP BIOLOGY =====
  { courseCode: "SBFYHAR3", skillId: "ratios-and-proportions", weight: 5,
    chain: ["Set up and solve a proportion",
            "Compute allele and genotype frequencies",
            "Work Hardy-Weinberg and Punnett square problems"],
    practiceQuery: "ratios and proportions" },

  { courseCode: "SBFYHAR3", skillId: "read-graphs", weight: 5,
    chain: ["Read axes, units, and scale correctly",
            "Describe a trend and identify the controlled variable",
            "Analyze experimental data in free response questions"],
    practiceQuery: "interpreting graphs science" },

  { courseCode: "SBFYHAR3", skillId: "scientific-notation", weight: 3,
    chain: ["Convert between units and powers of ten",
            "Handle cell-scale and molar quantities",
            "Complete quantitative lab calculations"],
    practiceQuery: "scientific notation unit conversion" },

  { courseCode: "SBFYHAR3", skillId: "bonding-and-polarity", weight: 4,
    chain: ["Tell ionic from covalent bonds, and polar from nonpolar",
            "Explain hydrogen bonding and why water behaves as it does",
            "Understand protein folding and membrane structure"],
    practiceQuery: "ionic vs covalent bonds polarity" },

  // ===== AP LITERATURE I =====
  { courseCode: "ELFYLIT1", skillId: "claim-vs-summary", weight: 5,
    chain: ["Recognize when a sentence argues vs. when it just reports",
            "Write body paragraphs that advance an argument",
            "Score above the summary ceiling on the AP Lit essay rubric"],
    practiceQuery: "claim versus summary thesis writing" },

  { courseCode: "ELFYLIT1", skillId: "defensible-thesis", weight: 5,
    chain: ["State a position someone could reasonably disagree with",
            "Build an essay whose paragraphs all serve that position",
            "Earn the thesis point on the AP Lit rubric"],
    practiceQuery: "how to write a defensible thesis" },

  { courseCode: "ELFYLIT1", skillId: "integrate-evidence", weight: 4,
    chain: ["Choose a quote that actually supports the claim",
            "Embed it in a sentence instead of dropping it",
            "Earn evidence and commentary points"],
    practiceQuery: "integrating textual evidence quotes" },

  { courseCode: "ELFYLIT1", skillId: "commentary-not-restatement", weight: 5,
    chain: ["Explain how the evidence proves the claim",
            "Connect a device to its effect on meaning",
            "Move from a 3 to a 5 or 6 on the AP Lit essay rubric"],
    practiceQuery: "literary analysis commentary vs summary" },

  // ===== AP CHEMISTRY — no new skills, no new questions =====
  // This block is the canonical-Skill decision paying off. Chemistry leans on
  // four skills that already exist, already have questions, and already carry
  // their origin: adding the course was four rows of chain text. The weights
  // and chains are Chemistry's own, because that is what CourseSkill is for.
  // TODO: confirm with an AP Chem teacher.
  { courseCode: "SCFYHAR", skillId: "ratios-and-proportions", weight: 5,
    chain: ["Set up and solve a proportion",
            "Convert between moles, mass, and number of particles",
            "Work stoichiometry from a balanced equation"],
    practiceQuery: "ratios and proportions" },

  { courseCode: "SCFYHAR", skillId: "scientific-notation", weight: 5,
    chain: ["Convert between units and powers of ten",
            "Handle Avogadro's number and molar quantities",
            "Complete quantitative lab calculations"],
    practiceQuery: "scientific notation unit conversion" },

  { courseCode: "SCFYHAR", skillId: "bonding-and-polarity", weight: 5,
    chain: ["Tell ionic from covalent bonds, and polar from nonpolar",
            "Predict what dissolves in what, and why",
            "Explain intermolecular forces and the properties they cause"],
    practiceQuery: "ionic vs covalent bonds polarity" },

  { courseCode: "SCFYHAR", skillId: "read-graphs", weight: 3,
    chain: ["Read axes, units, and scale correctly",
            "Follow a titration or rate curve to its turning point",
            "Analyze experimental data in free response questions"],
    practiceQuery: "interpreting graphs science" },

  // ===== AP PHYSICS C: MECHANICS — likewise =====
  // Physics C is taken concurrently with or after Calculus BC I, and leans on
  // the same middle school algebra underneath it. Same skills, same questions,
  // different chains.
  // TODO: confirm with the AP Physics C teacher.
  { courseCode: "SPFYHAR2", skillId: "substitute-value", weight: 5,
    chain: ["Substitute carefully, signs and units included",
            "Evaluate a kinematics equation at a given time",
            "Solve motion problems without losing a sign"],
    practiceQuery: "evaluating expressions substitution" },

  { courseCode: "SPFYHAR2", skillId: "solve-for-constant", weight: 5,
    chain: ["Solve an equation for a letter that isn't x",
            "Rearrange a law for the quantity you actually want",
            "Work symbolic free response problems"],
    practiceQuery: "solving equations for a variable" },

  { courseCode: "SPFYHAR2", skillId: "ratios-and-proportions", weight: 4,
    chain: ["Set up and solve a proportion",
            "Say what happens to one quantity when another doubles",
            "Check an answer by its units and its order of magnitude"],
    practiceQuery: "ratios and proportions" },

  { courseCode: "SPFYHAR2", skillId: "factoring-quadratics", weight: 3,
    chain: ["Factor a quadratic into two binomials",
            "Solve a quadratic kinematics equation for the time",
            "Choose the root that physically happened"],
    practiceQuery: "factoring quadratics" },

  // ===== AP PRECALCULUS — the earliest place this check can catch anyone =====
  // Ninth grade, and the first math course in the building. Every skill it
  // leans on has a null origin course: this is the exact point where the
  // missing algebra year becomes the school's problem, one year before
  // Calculus makes it the student's.
  { courseCode: "MPFYHAR", skillId: "factoring-quadratics", weight: 5,
    chain: ["Factor a quadratic into two binomials",
            "Find the zeros of a polynomial function",
            "Sketch a polynomial from its factors"],
    practiceQuery: "factoring quadratics" },

  { courseCode: "MPFYHAR", skillId: "substitute-value", weight: 5,
    chain: ["Substitute carefully, signs and exponents included",
            "Evaluate a function at a given input",
            "Read function notation without guessing at it"],
    practiceQuery: "evaluating expressions substitution" },

  { courseCode: "MPFYHAR", skillId: "solve-for-constant", weight: 4,
    chain: ["Solve an equation for a letter that isn't x",
            "Find the parameter that makes a function pass through a point",
            "Build a function to fit a described condition"],
    practiceQuery: "solving equations for a variable" },

  { courseCode: "MPFYHAR", skillId: "strict-vs-inclusive-inequalities", weight: 4,
    chain: ["Tell < apart from ≤ in a domain",
            "Write the domain of a piecewise function",
            "Say where a function is and is not defined"],
    practiceQuery: "inequalities and interval notation" },

  { courseCode: "MPFYHAR", skillId: "set-expressions-equal", weight: 3,
    chain: ["Set expression A equal to expression B",
            "Find where two functions meet",
            "Solve intersection and system problems"],
    practiceQuery: "setting up equations" },

  // ===== AP CALCULUS BC II — integral calculus =====
  { courseCode: "MCFYHAR2", skillId: "factoring-quadratics", weight: 5,
    chain: ["Factor a quadratic into two binomials",
            "Split a rational function into partial fractions",
            "Integrate a rational function"],
    practiceQuery: "factoring quadratics" },

  { courseCode: "MCFYHAR2", skillId: "simplify-rational-expressions", weight: 5,
    chain: ["Cancel a common factor from top and bottom",
            "Reduce an integrand before integrating it",
            "Recognize an integral you already know how to do"],
    practiceQuery: "simplifying rational expressions" },

  { courseCode: "MCFYHAR2", skillId: "substitute-value", weight: 4,
    chain: ["Substitute carefully, signs and exponents included",
            "Evaluate an antiderivative at both limits",
            "Apply the Fundamental Theorem without sign errors"],
    practiceQuery: "evaluating expressions substitution" },

  { courseCode: "MCFYHAR2", skillId: "solve-for-constant", weight: 3,
    chain: ["Solve an equation for a letter that isn't x",
            "Find the constant of integration from a starting value",
            "Solve a differential equation with an initial condition"],
    practiceQuery: "solving equations for a variable" },

  // ===== AP LITERATURE II — the same four skills, a year later =====
  { courseCode: "ELFYLIT2", skillId: "claim-vs-summary", weight: 5,
    chain: ["Recognize when a sentence argues vs. when it just reports",
            "Write about an unfamiliar text without retelling it",
            "Score above the summary ceiling on the AP Lit essay rubric"],
    practiceQuery: "claim versus summary thesis writing" },

  { courseCode: "ELFYLIT2", skillId: "defensible-thesis", weight: 5,
    chain: ["State a position someone could reasonably disagree with",
            "Hold one position across a longer and stranger text",
            "Earn the thesis point on the AP Lit rubric"],
    practiceQuery: "how to write a defensible thesis" },

  { courseCode: "ELFYLIT2", skillId: "integrate-evidence", weight: 4,
    chain: ["Choose a quote that actually supports the claim",
            "Work with a translation, where the wording is not the author's",
            "Earn evidence and commentary points"],
    practiceQuery: "integrating textual evidence quotes" },

  { courseCode: "ELFYLIT2", skillId: "commentary-not-restatement", weight: 5,
    chain: ["Explain how the evidence proves the claim",
            "Connect a device to its effect on meaning",
            "Move from a 3 to a 5 or 6 on the AP Lit essay rubric"],
    practiceQuery: "literary analysis commentary vs summary" },

  // ===== AP US HISTORY I — three history skills and three writing ones =====
  // The writing skills are the SAME ROWS AP Lit uses. A student shaky on claim
  // versus summary is shaky in both rooms, and now hears so in both, off one
  // set of questions.
  { courseCode: "HUFYHAR1", skillId: "sourcing-a-document", weight: 5,
    chain: ["Ask who wrote a source and what they wanted from it",
            "Say what that does to what the source can be used for",
            "Earn the sourcing point on a document-based question"],
    practiceQuery: "analyzing primary sources point of view" },

  { courseCode: "HUFYHAR1", skillId: "contextualize-an-event", weight: 5,
    chain: ["Say what else was going on at the time",
            "Place a document in the moment that produced it",
            "Earn the contextualization point"],
    practiceQuery: "historical contextualization" },

  { courseCode: "HUFYHAR1", skillId: "causation-vs-sequence", weight: 4,
    chain: ["Tell a cause apart from what merely came after",
            "Explain why a development happened, not only when",
            "Answer a causation prompt instead of narrating"],
    practiceQuery: "correlation versus causation history" },

  { courseCode: "HUFYHAR1", skillId: "claim-vs-summary", weight: 5,
    chain: ["Recognize when a sentence argues vs. when it just reports",
            "Write body paragraphs that advance an argument",
            "Stop narrating the period and start arguing about it"],
    practiceQuery: "claim versus summary thesis writing" },

  { courseCode: "HUFYHAR1", skillId: "defensible-thesis", weight: 5,
    chain: ["State a position someone could reasonably disagree with",
            "Answer the verb the prompt actually asked",
            "Earn the thesis point on the long essay"],
    practiceQuery: "how to write a defensible thesis" },

  { courseCode: "HUFYHAR1", skillId: "integrate-evidence", weight: 4,
    chain: ["Choose evidence that actually supports the claim",
            "Use a document rather than quoting it",
            "Earn the evidence and analysis points"],
    practiceQuery: "using evidence in historical writing" },

  // Reading a source for what it CLAIMS is the framework's "claims and
  // evidence in sources", and it is the same skill AP Language calls finding
  // the argument. Linking it here is also what makes the
  // read-for-the-argument -> claim-vs-summary edge live: without a course that
  // leans on both, the edge would sit in the graph doing nothing.
  { courseCode: "HUFYHAR1", skillId: "read-for-the-argument", weight: 4,
    chain: ["Find what a source argues, not just what it is about",
            "Say what its author wanted the reader to conclude",
            "Use a document as an argument rather than as a fact"],
    practiceQuery: "identifying an author's argument and claim" },

  { courseCode: "HUFYHAR1", skillId: "evidence-vs-assertion", weight: 3,
    chain: ["Tell a supported statement from a bare assertion",
            "Notice when a source asserts rather than shows",
            "Choose evidence that would survive a challenge"],
    practiceQuery: "evidence versus opinion in argument writing" },

  // ===== AP US HISTORY II — exam year, so argument carries more =====
  { courseCode: "HUFYHAR2", skillId: "sourcing-a-document", weight: 5,
    chain: ["Ask who wrote a source and what they wanted from it",
            "Weigh two sources that disagree",
            "Earn sourcing across all seven documents"],
    practiceQuery: "analyzing primary sources point of view" },

  { courseCode: "HUFYHAR2", skillId: "contextualize-an-event", weight: 4,
    chain: ["Say what else was going on at the time",
            "Connect a period to the one before it",
            "Earn the contextualization point under time pressure"],
    practiceQuery: "historical contextualization" },

  { courseCode: "HUFYHAR2", skillId: "causation-vs-sequence", weight: 5,
    chain: ["Tell a cause apart from what merely came after",
            "Argue a cause rather than list a chronology",
            "Answer causation and change-over-time prompts"],
    practiceQuery: "correlation versus causation history" },

  { courseCode: "HUFYHAR2", skillId: "claim-vs-summary", weight: 5,
    chain: ["Recognize when a sentence argues vs. when it just reports",
            "Write body paragraphs that advance an argument",
            "Clear the narration ceiling on the DBQ"],
    practiceQuery: "claim versus summary thesis writing" },

  { courseCode: "HUFYHAR2", skillId: "defensible-thesis", weight: 5,
    chain: ["State a position someone could reasonably disagree with",
            "Hold that position across seven documents",
            "Earn the thesis and complexity points"],
    practiceQuery: "how to write a defensible thesis" },

  { courseCode: "HUFYHAR2", skillId: "integrate-evidence", weight: 5,
    chain: ["Choose evidence that actually supports the claim",
            "Use six documents plus outside evidence",
            "Earn the full evidence band on the DBQ"],
    practiceQuery: "using evidence in historical writing" },

  { courseCode: "HUFYHAR2", skillId: "read-for-the-argument", weight: 4,
    chain: ["Find what a source argues, not just what it is about",
            "Set two documents against each other as arguments",
            "Use a document as an argument rather than as a fact"],
    practiceQuery: "identifying an author's argument and claim" },

  { courseCode: "HUFYHAR2", skillId: "evidence-vs-assertion", weight: 4,
    chain: ["Tell a supported statement from a bare assertion",
            "Notice when a source asserts rather than shows",
            "Choose evidence that would survive a challenge"],
    practiceQuery: "evidence versus opinion in argument writing" },

  // ===== AP EUROPEAN HISTORY — same six skills, different century =====
  { courseCode: "HRFYHAR", skillId: "sourcing-a-document", weight: 5,
    chain: ["Ask who wrote a source and what they wanted from it",
            "Read a source from a society unlike your own",
            "Earn the sourcing point on a document-based question"],
    practiceQuery: "analyzing primary sources point of view" },

  { courseCode: "HRFYHAR", skillId: "contextualize-an-event", weight: 5,
    chain: ["Say what else was going on at the time",
            "Place a movement in the century that produced it",
            "Earn the contextualization point"],
    practiceQuery: "historical contextualization" },

  { courseCode: "HRFYHAR", skillId: "causation-vs-sequence", weight: 4,
    chain: ["Tell a cause apart from what merely came after",
            "Explain why a revolution happened, not only when",
            "Answer a causation prompt instead of narrating"],
    practiceQuery: "correlation versus causation history" },

  { courseCode: "HRFYHAR", skillId: "defensible-thesis", weight: 5,
    chain: ["State a position someone could reasonably disagree with",
            "Answer the verb the prompt actually asked",
            "Earn the thesis point on the long essay"],
    practiceQuery: "how to write a defensible thesis" },

  { courseCode: "HRFYHAR", skillId: "read-for-the-argument", weight: 4,
    chain: ["Find what a source argues, not just what it is about",
            "Say what its author wanted the reader to conclude",
            "Use a document as an argument rather than as a fact"],
    practiceQuery: "identifying an author's argument and claim" },

  // ===== AP MACROECONOMICS =====
  { courseCode: "HEFYHAR1", skillId: "percent-change-vs-level", weight: 5,
    chain: ["Tell a rate of change apart from a level",
            "Say what falling inflation actually does to prices",
            "Read growth, unemployment and inflation data correctly"],
    practiceQuery: "percent change versus level rate of change" },

  { courseCode: "HEFYHAR1", skillId: "read-graphs", weight: 5,
    chain: ["Read axes, units, and scale correctly",
            "Tell a movement along a curve from a shift of the curve",
            "Work supply and demand and AD-AS problems"],
    practiceQuery: "interpreting graphs economics" },

  { courseCode: "HEFYHAR1", skillId: "ratios-and-proportions", weight: 4,
    chain: ["Set up and solve a proportion",
            "Get a real value from a nominal one",
            "Work index, multiplier and rate problems"],
    practiceQuery: "ratios and proportions" },

  { courseCode: "HEFYHAR1", skillId: "causation-vs-sequence", weight: 3,
    chain: ["Tell a cause apart from what merely came after",
            "Say why two indicators moving together is not a policy result",
            "Argue about a policy rather than narrate the data"],
    practiceQuery: "correlation versus causation economics" },

  // ===== AP MICROECONOMICS =====
  { courseCode: "HEFYHAR2", skillId: "read-graphs", weight: 5,
    chain: ["Read axes, units, and scale correctly",
            "Tell a movement along a curve from a shift of the curve",
            "Work elasticity and market structure graphs"],
    practiceQuery: "interpreting graphs economics" },

  { courseCode: "HEFYHAR2", skillId: "ratios-and-proportions", weight: 5,
    chain: ["Set up and solve a proportion",
            "Compute elasticity as one percent change over another",
            "Compare marginal cost and marginal revenue"],
    practiceQuery: "ratios and proportions" },

  { courseCode: "HEFYHAR2", skillId: "percent-change-vs-level", weight: 4,
    chain: ["Tell a rate of change apart from a level",
            "Read what a percent change in price does to quantity",
            "Interpret elasticity without inverting it"],
    practiceQuery: "percent change versus level rate of change" },

  // ===== AP ENVIRONMENTAL SCIENCE — ninth grade, entirely reused =====
  { courseCode: "SEFYHAR", skillId: "ratios-and-proportions", weight: 5,
    chain: ["Set up and solve a proportion",
            "Scale a rate up to a population or an area",
            "Work carrying capacity and consumption problems"],
    practiceQuery: "ratios and proportions" },

  { courseCode: "SEFYHAR", skillId: "read-graphs", weight: 5,
    chain: ["Read axes, units, and scale correctly",
            "Describe a trend and name the controlled variable",
            "Analyze data in the free response questions"],
    practiceQuery: "interpreting graphs science" },

  { courseCode: "SEFYHAR", skillId: "scientific-notation", weight: 4,
    chain: ["Convert between units and powers of ten",
            "Carry units through a multi-step calculation",
            "Complete the quantitative free response question"],
    practiceQuery: "scientific notation unit conversion" },

  { courseCode: "SEFYHAR", skillId: "percent-change-vs-level", weight: 3,
    chain: ["Tell a rate of change apart from a level",
            "Say what a falling growth rate does to a population",
            "Reason about exponential growth and doubling time"],
    practiceQuery: "percent change versus level rate of change" },

  // ===== AP COMPUTER SCIENCE PRINCIPLES =====
  { courseCode: "SSFYHAR", skillId: "boolean-logic", weight: 5,
    chain: ["Say whether a condition is true or false",
            "Predict which branch of an if statement runs",
            "Trace and debug conditional logic"],
    practiceQuery: "boolean logic and or not truth tables" },

  { courseCode: "SSFYHAR", skillId: "trace-a-procedure", weight: 5,
    chain: ["Follow a written procedure exactly, step by step",
            "Say what a loop has left behind when it finishes",
            "Predict the output of a program you did not write"],
    practiceQuery: "tracing algorithms step by step" },

  { courseCode: "SSFYHAR", skillId: "number-bases", weight: 4,
    chain: ["Read a number written in binary",
            "Say how many values a given number of bits can hold",
            "Reason about data, storage and overflow"],
    practiceQuery: "binary number system place value" },

  { courseCode: "SSFYHAR", skillId: "substitute-value", weight: 3,
    chain: ["Substitute carefully, signs and exponents included",
            "Work out what an expression evaluates to",
            "Say what a variable holds after an assignment"],
    practiceQuery: "evaluating expressions substitution" },

  // ===== AP COMPUTER SCIENCE A =====
  { courseCode: "SSFYHAR2", skillId: "trace-a-procedure", weight: 5,
    chain: ["Follow a written procedure exactly, step by step",
            "Hand-trace a loop over an array",
            "Answer code-tracing questions without running the code"],
    practiceQuery: "tracing algorithms step by step" },

  { courseCode: "SSFYHAR2", skillId: "boolean-logic", weight: 5,
    chain: ["Say whether a condition is true or false",
            "Write a compound condition that means what you intend",
            "Debug an off-by-one or inverted condition"],
    practiceQuery: "boolean logic and or not truth tables" },

  { courseCode: "SSFYHAR2", skillId: "substitute-value", weight: 3,
    chain: ["Substitute carefully, signs and exponents included",
            "Evaluate an expression the way the machine will",
            "Predict what a variable holds after assignment"],
    practiceQuery: "evaluating expressions substitution" },

  { courseCode: "SSFYHAR2", skillId: "number-bases", weight: 3,
    chain: ["Read a number written in binary",
            "Reason about integer limits and overflow",
            "Explain why a large int wraps around"],
    practiceQuery: "binary number system place value" },

  // ===== AP PSYCHOLOGY — research methods are quantitative =====
  { courseCode: "SYFYHAR", skillId: "read-graphs", weight: 5,
    chain: ["Read axes, units, and scale correctly",
            "Tell an experiment apart from a correlation in a figure",
            "Interpret research findings in the free response"],
    practiceQuery: "interpreting graphs science" },

  { courseCode: "SYFYHAR", skillId: "ratios-and-proportions", weight: 4,
    chain: ["Set up and solve a proportion",
            "Read a percentage of a sample correctly",
            "Interpret study results without overstating them"],
    practiceQuery: "ratios and proportions" },

  { courseCode: "SYFYHAR", skillId: "causation-vs-sequence", weight: 4,
    chain: ["Tell a cause apart from what merely came after",
            "Say why a correlation does not establish a cause",
            "Evaluate whether a study supports its own conclusion"],
    practiceQuery: "correlation versus causation research" },

  { courseCode: "SYFYHAR", skillId: "evidence-vs-assertion", weight: 4,
    chain: ["Tell a supported statement from a bare assertion",
            "Notice when a study is described rather than reported",
            "Say whether a finding actually supports the claim made from it"],
    practiceQuery: "evidence versus opinion in argument writing" },

  // ===== AP LANGUAGE AND COMPOSITION II — ninth grade =====
  // Note what is NOT here: the four writing skills this course teaches. It
  // rests on the layer beneath them instead. Sourcing is the interesting reuse
  // — the rhetorical situation (speaker, audience, purpose) is the same skill
  // APUSH calls sourcing a document, so one set of questions serves both.
  { courseCode: "ELFYLAC2", skillId: "read-for-the-argument", weight: 5,
    chain: ["Find what a text argues, not just what it is about",
            "Track how the argument is built across paragraphs",
            "Analyze rhetorical choices instead of listing them"],
    practiceQuery: "identifying an author's argument and claim" },

  { courseCode: "ELFYLAC2", skillId: "sourcing-a-document", weight: 5,
    chain: ["Ask who wrote a text and what they wanted from it",
            "Name the speaker, audience and purpose",
            "Write a rhetorical analysis that is about the choices"],
    practiceQuery: "rhetorical situation speaker audience purpose" },

  { courseCode: "ELFYLAC2", skillId: "evidence-vs-assertion", weight: 4,
    chain: ["Tell a supported statement from a bare assertion",
            "Choose evidence a skeptical reader would accept",
            "Earn the evidence and commentary points on the argument essay"],
    practiceQuery: "evidence versus opinion in argument writing" },

  { courseCode: "ELFYLAC2", skillId: "sentence-boundaries", weight: 3,
    chain: ["Tell a complete sentence from a fragment or a splice",
            "Hold a complex idea together in one sentence",
            "Stop losing points to sentence errors under time pressure"],
    practiceQuery: "sentence fragments run-ons comma splices" },

  // ===== AP ART HISTORY =====
  { courseCode: "HAFYHAH", skillId: "contextualize-an-event", weight: 5,
    chain: ["Say what else was going on at the time",
            "Place a work in the society that paid for it",
            "Earn the contextual analysis points"],
    practiceQuery: "historical contextualization" },

  { courseCode: "HAFYHAH", skillId: "claim-vs-summary", weight: 5,
    chain: ["Recognize when a sentence argues vs. when it just reports",
            "Write about a work instead of only describing it",
            "Move past description on the free response"],
    practiceQuery: "claim versus summary thesis writing" },

  { courseCode: "HAFYHAH", skillId: "integrate-evidence", weight: 4,
    chain: ["Choose evidence that actually supports the claim",
            "Point at a specific visual detail, not a general impression",
            "Support an attribution with what is actually visible"],
    practiceQuery: "using visual evidence art analysis" },

  { courseCode: "HAFYHAH", skillId: "sourcing-a-document", weight: 3,
    chain: ["Ask who made a work and what they wanted from it",
            "Account for the patron as well as the artist",
            "Explain function and audience, not only style"],
    practiceQuery: "analyzing primary sources point of view" },

  // ===== AP COMPARATIVE GOVERNMENT =====
  { courseCode: "HGFYHAR", skillId: "causation-vs-sequence", weight: 5,
    chain: ["Tell a cause apart from what merely came after",
            "Explain why a regime changed, not only when",
            "Answer a causation prompt about a country you studied"],
    practiceQuery: "correlation versus causation history" },

  { courseCode: "HGFYHAR", skillId: "read-graphs", weight: 4,
    chain: ["Read axes, units, and scale correctly",
            "Compare two countries from a single figure",
            "Answer the quantitative analysis question"],
    practiceQuery: "interpreting graphs data analysis" },

  { courseCode: "HGFYHAR", skillId: "contextualize-an-event", weight: 4,
    chain: ["Say what else was going on at the time",
            "Place a policy in the system that produced it",
            "Compare across countries without flattening them"],
    practiceQuery: "historical contextualization" },

  { courseCode: "HGFYHAR", skillId: "percent-change-vs-level", weight: 3,
    chain: ["Tell a rate of change apart from a level",
            "Read what a falling growth rate means for a country",
            "Interpret development and election data"],
    practiceQuery: "percent change versus level rate of change" },

  // ===== FILM IN THE 20TH CENTURY =====
  { courseCode: "ELFYFILI", skillId: "claim-vs-summary", weight: 5,
    chain: ["Recognize when a sentence argues vs. when it just reports",
            "Write about a film without recounting the plot",
            "Make an argument about what the film is doing"],
    practiceQuery: "claim versus summary thesis writing" },

  { courseCode: "ELFYFILI", skillId: "commentary-not-restatement", weight: 5,
    chain: ["Explain how the evidence proves the claim",
            "Connect a shot or a cut to its effect on meaning",
            "Write analysis rather than description"],
    practiceQuery: "film analysis technique and meaning" },

  { courseCode: "ELFYFILI", skillId: "integrate-evidence", weight: 4,
    chain: ["Choose evidence that actually supports the claim",
            "Point at a specific shot instead of a whole scene",
            "Support a reading with what is on the screen"],
    practiceQuery: "integrating textual evidence quotes" },

  { courseCode: "ELFYFILI", skillId: "contextualize-an-event", weight: 3,
    chain: ["Say what else was going on at the time",
            "Place a film in the decade that produced it",
            "Explain why the film could only have been made then"],
    practiceQuery: "historical contextualization" },
];

// ---------------------------------------------------------------------------
// SKILL DEPENDENCIES
//
// What the report does with these: take the weak skills from an attempt, keep
// only the edges between them, topologically sort, and lead with a source node.
// A student weak on both factoring and rational expressions is told to fix
// FACTORING first — which the prototype, sorting by accuracy alone, could not
// do, because it would lead with whichever one they happened to miss more.
//
// The writing chain is the densest set here, and the most useful: it sorts to
// claim-vs-summary first, which is exactly the thing AP Lit students are told
// over and over and still do not fix, because nobody shows them it is the root.
//
// The quantitative science skills are mostly independent of each other, and
// only one edge among them is defensible enough to author. The rest are absent
// on purpose: an absent edge degrades gracefully (the skill sorts by weight, as
// before), a wrong edge tells a student to fix the wrong thing.
//
// TODO: the Bio and Lit edges are mine, not a teacher's. Confirm before they go
// in front of students.
//
// Must stay acyclic. The seed asserts it.
// ---------------------------------------------------------------------------

export const SKILL_DEPENDENCIES: SkillEdge[] = [
  { prerequisiteId: "factoring-quadratics", dependentId: "simplify-rational-expressions", strength: 5,
    rationale: "You cannot cancel a shared factor you were unable to find in the first place." },

  { prerequisiteId: "substitute-value", dependentId: "evaluate-piecewise", strength: 5,
    rationale: "Picking the right piece buys you nothing if the substitution into it goes wrong." },

  { prerequisiteId: "strict-vs-inclusive-inequalities", dependentId: "evaluate-piecewise", strength: 5,
    rationale: "Which piece owns the break point is decided entirely by strict versus inclusive." },

  { prerequisiteId: "substitute-value", dependentId: "set-expressions-equal", strength: 4,
    rationale: "Writing the continuity condition means substituting the break point into both pieces first." },

  { prerequisiteId: "evaluate-piecewise", dependentId: "set-expressions-equal", strength: 3,
    rationale: "You cannot set the two pieces equal at the break point until you can say which piece is which." },

  { prerequisiteId: "set-expressions-equal", dependentId: "solve-for-constant", strength: 5,
    rationale: "You have to write the equation before there is anything to solve for the constant." },

  // ===== AP LITERATURE I — the writing chain =====
  { prerequisiteId: "claim-vs-summary", dependentId: "defensible-thesis", strength: 5,
    rationale: "A thesis is a claim. While arguing and reporting still look alike, the thesis comes out as a summary in a confident voice." },

  { prerequisiteId: "claim-vs-summary", dependentId: "commentary-not-restatement", strength: 4,
    rationale: "Commentary is the same distinction one sentence at a time: restating the evidence is summarising it." },

  { prerequisiteId: "defensible-thesis", dependentId: "integrate-evidence", strength: 3,
    rationale: "Evidence is chosen to support a position. With no position, every quote from the right scene looks as good as the next." },

  { prerequisiteId: "integrate-evidence", dependentId: "commentary-not-restatement", strength: 4,
    rationale: "Commentary explains how the quote proves the claim. A quote that was dropped in, or never bore on the claim, leaves nothing to explain." },

  // ===== QUANTITATIVE SCIENCE =====
  // The only edge among these four that holds up. Ratios, bonding and graph
  // reading are otherwise independent of one another, so they are left to sort
  // by weight.
  { prerequisiteId: "scientific-notation", dependentId: "read-graphs", strength: 3,
    rationale: "An axis labelled in powers of ten is unreadable to a student for whom powers of ten are unreadable." },

  { prerequisiteId: "percent-change-vs-level", dependentId: "read-graphs", strength: 3,
    rationale: "A curve of a rate and a curve of a level look identical and mean opposite things." },

  // ===== HISTORY =====
  { prerequisiteId: "contextualize-an-event", dependentId: "causation-vs-sequence", strength: 3,
    rationale: "You cannot say what caused something without knowing what else was going on at the time." },

  { prerequisiteId: "causation-vs-sequence", dependentId: "defensible-thesis", strength: 4,
    rationale: "A historical thesis almost always claims a cause. Without the distinction it claims a sequence and calls that an argument." },

  { prerequisiteId: "sourcing-a-document", dependentId: "integrate-evidence", strength: 3,
    rationale: "A document cannot be used as evidence responsibly until you know who made it and what they wanted." },

  // ===== COMPUTING =====
  { prerequisiteId: "boolean-logic", dependentId: "trace-a-procedure", strength: 4,
    rationale: "Tracing a branch means deciding whether its condition is true, one line at a time." },

  // ===== UNDER THE WRITING CHAIN =====
  // These two run from the Lang II layer into the Lit and APUSH layer, which
  // is what the graph is for: a student weak on finding an argument in
  // someone else's writing is told so before being told to write one.
  { prerequisiteId: "read-for-the-argument", dependentId: "claim-vs-summary", strength: 4,
    rationale: "Recognising a claim in someone else's writing comes before writing one of your own." },

  { prerequisiteId: "evidence-vs-assertion", dependentId: "integrate-evidence", strength: 3,
    rationale: "Choosing a quote that supports a claim assumes you can tell support from a confident sentence." },
];
