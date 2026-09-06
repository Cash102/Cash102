/**
 * HSLA course catalog + official prerequisite graph.
 * Source: Success Academy HSLA Directory of Courses, SY 25-26 (updated 08/13/25)
 *
 * Copied verbatim from the catalog so that next year's edition is a readable
 * diff. Everything the catalog does not contain — the skill layer — lives in
 * ./skill-graph.ts.
 */

export type ChainType = "content" | "skill";

export interface Course {
  code: string;
  title: string;
  subject: "English" | "History" | "Mathematics" | "Science" | "College Persistence";
  credits: number;
  required: boolean;
  grades: number[];
  prerequisiteCodes: string[];
  externalExam: string | null;
  notes?: string;
}

export const COURSES: Course[] = [
  // ---------- ENGLISH ----------
  { code: "ELFYLAC2", title: "AP Language and Composition II", subject: "English",
    credits: 1, required: true, grades: [9], prerequisiteCodes: [],
    externalExam: "AP English Language and Composition" },

  { code: "ELFYLIT1", title: "AP Literature and Composition I: American Literature", subject: "English",
    credits: 1, required: true, grades: [10], prerequisiteCodes: [],
    externalExam: "AP English Literature and Composition",
    notes: "Self-contained. AP Lit exam taken at the end of both Lit I and Lit II." },

  { code: "ELFYLIT2", title: "AP Literature and Composition II: World Literature", subject: "English",
    credits: 1, required: true, grades: [11], prerequisiteCodes: [],
    externalExam: "AP English Literature and Composition" },

  { code: "ELFYCOLI", title: "Contemporary Literature", subject: "English",
    credits: 1, required: false, grades: [12], prerequisiteCodes: [],
    externalExam: null, notes: "Not offered SY 25-26" },

  { code: "ELFYFILI", title: "Film in the 20th Century", subject: "English",
    credits: 1, required: false, grades: [12], prerequisiteCodes: [], externalExam: null },

  // ---------- HISTORY ----------
  { code: "HUFYHAR1", title: "AP United States History I: 1491-1877", subject: "History",
    credits: 1, required: true, grades: [9, 10], prerequisiteCodes: [],
    externalExam: null, notes: "Exam taken at end of APUSH II the following year." },

  { code: "HUFYHAR2", title: "AP United States History II: 1877-Present", subject: "History",
    credits: 1, required: true, grades: [11], prerequisiteCodes: ["HUFYHAR1"],
    externalExam: "AP United States History" },

  { code: "HEFYHAR1", title: "AP Macroeconomics", subject: "History",
    credits: 1, required: true, grades: [9, 11], prerequisiteCodes: [],
    externalExam: "AP Macroeconomics" },

  { code: "HAFYHAH", title: "AP Art History", subject: "History",
    credits: 1, required: false, grades: [9, 11], prerequisiteCodes: [],
    externalExam: "AP Art History" },

  { code: "HRFYHAR", title: "AP European History", subject: "History",
    credits: 1, required: false, grades: [12], prerequisiteCodes: [],
    externalExam: "AP European History", notes: "BK and HA campuses only" },

  { code: "HEFYHAR2", title: "AP Microeconomics", subject: "History",
    credits: 1, required: false, grades: [12], prerequisiteCodes: ["HEFYHAR1"],
    externalExam: "AP Microeconomics", notes: "MA and HA campuses only" },

  { code: "HFFYHAR", title: "AP African American Studies", subject: "History",
    credits: 1, required: false, grades: [12], prerequisiteCodes: [],
    externalExam: "AP African American Studies", notes: "Not offered SY 25-26" },

  { code: "HGFYHAR", title: "AP Comparative Government", subject: "History",
    credits: 1, required: false, grades: [12], prerequisiteCodes: [],
    externalExam: "AP Comparative Government", notes: "MA campus only" },

  // ---------- MATHEMATICS ----------
  // NOTE: there is no Algebra or Geometry course in the HS catalog. The algebra
  // foundation comes from middle school and is never formally revisited. This is
  // the gap the app exists to find.
  { code: "MPFYHAR", title: "AP Precalculus", subject: "Mathematics",
    credits: 1, required: true, grades: [9], prerequisiteCodes: [],
    externalExam: "AP Precalculus" },

  { code: "MCFYHAR", title: "AP Calculus BC I: Differential Calculus", subject: "Mathematics",
    credits: 1, required: true, grades: [10, 11], prerequisiteCodes: ["MPFYHAR"],
    externalExam: null, notes: "Exam taken at end of Calc BC II the following year." },

  { code: "MCFYHAR2", title: "AP Calculus BC II: Integral Calculus", subject: "Mathematics",
    credits: 1, required: true, grades: [11, 12], prerequisiteCodes: ["MCFYHAR"],
    externalExam: "AP Calculus BC" },

  { code: "MSFYHAR2", title: "AP Statistics", subject: "Mathematics",
    credits: 1, required: false, grades: [12], prerequisiteCodes: [],
    externalExam: "AP Statistics", notes: "Not offered SY 25-26" },

  { code: "MTFYGAM", title: "Number Theory and Game Theory", subject: "Mathematics",
    credits: 1, required: false, grades: [12], prerequisiteCodes: [],
    externalExam: null, notes: "Not offered SY 25-26" },

  // ---------- SCIENCE ----------
  { code: "SEFYHAR", title: "AP Environmental Science", subject: "Science",
    credits: 1, required: true, grades: [9], prerequisiteCodes: [],
    externalExam: "AP Environmental Science",
    notes: "Not required if taking AP Biology in grade 9." },

  { code: "SBFYHAR3", title: "AP Biology", subject: "Science",
    credits: 1, required: true, grades: [9, 10], prerequisiteCodes: [],
    externalExam: "AP Biology" },

  { code: "SCFYHAR", title: "AP Chemistry", subject: "Science",
    credits: 1, required: true, grades: [10, 11], prerequisiteCodes: ["SBFYHAR3"],
    externalExam: "AP Chemistry" },

  { code: "SSFYHAR", title: "AP Computer Science Principles", subject: "Science",
    credits: 1, required: true, grades: [9, 11, 12], prerequisiteCodes: [],
    externalExam: "AP Computer Science Principles" },

  { code: "SSFYHAR2", title: "AP Computer Science A", subject: "Science",
    credits: 1, required: true, grades: [12], prerequisiteCodes: ["SSFYHAR"],
    externalExam: "AP Computer Science A", notes: "Required for Honors STEM only." },

  { code: "SPFYHAR2", title: "AP Physics C: Mechanics", subject: "Science",
    credits: 1, required: true, grades: [11], prerequisiteCodes: ["MCFYHAR"],
    externalExam: "AP Physics C: Mechanics",
    notes: "Honors STEM only. Concurrent with or after Calculus BC I." },

  { code: "SDFYENG", title: "Engineering Design", subject: "Science",
    credits: 1, required: false, grades: [12], prerequisiteCodes: [],
    externalExam: null, notes: "Not offered SY 25-26" },

  { code: "SYFYHAR", title: "AP Psychology", subject: "Science",
    credits: 1, required: false, grades: [12], prerequisiteCodes: ["SBFYHAR3"],
    externalExam: "AP Psychology", notes: "HA campus only" },

  // ---------- COLLEGE PERSISTENCE ----------
  { code: "GSXXHRR1", title: "Academic Core Seminar (SAT prep)", subject: "College Persistence",
    credits: 1, required: true, grades: [10], prerequisiteCodes: [],
    externalExam: "SAT", notes: "Not offered SY 25-26 — verify current status." }
];

/**
 * Prerequisite edges the catalog allows a student to take in the same year,
 * rather than strictly after. Keyed [courseCode, prerequisiteCode].
 *
 * Only one today: AP Physics C is noted "Concurrent with or after Calculus
 * BC I", which is exactly why CoursePrerequisite is an explicit model.
 */
export const CONCURRENT_PREREQUISITES: ReadonlyArray<readonly [string, string]> = [
  ["SPFYHAR2", "MCFYHAR"],
];

/** Derived from the catalog note rather than stored twice. */
export function isOffered(course: Course): boolean {
  return !/not offered/i.test(course.notes ?? "");
}
