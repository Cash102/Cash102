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
];
