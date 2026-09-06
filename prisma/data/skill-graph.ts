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
// Today this is 1:1 with SKILLS, because only three courses are scaffolded and
// no skill is shared yet. The first payoff arrives when AP Chemistry links to
// ratios-and-proportions and scientific-notation, and AP Physics C links to
// substitute-value and solve-for-constant: new courses, no new questions.
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
// Only Calculus is authored. Bio and Lit edges are deliberately absent until a
// teacher confirms them; an absent edge degrades gracefully (the skill sorts by
// weight, as before), a wrong edge tells a student to fix the wrong thing.
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
];
