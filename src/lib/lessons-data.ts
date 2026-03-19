export interface Lesson {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: number;
  order: number;
  color: string;
  content: {
    introduction: string;
    steps: string[];
    hints: string[];
    challenge: string;
    solutionCode: string;
  };
}

const lessonsData: Lesson[] = [
  {
    slug: 'hello-world',
    title: 'שלום עולם!',
    emoji: '👋',
    description: 'למד את הפקודה print והדפס את הודעתך הראשונה',
    difficulty: 'easy',
    duration: 5,
    order: 1,
    color: 'from-pink-400 to-rose-400',
    content: {
      introduction: 'בשיעור זה תלמד להדפיס טקסט באמצעות הפקודה print. זו הדרך הראשונה שלך לתקשר עם פייתון!',
      steps: ['הפקודה print משמשת להדפסת טקסט למסך', 'כתוב את הקוד print("שלום עולם!")', 'לחץ על כפתור "הרץ" כדי לראות את התוצאה', 'מזל טוב! הדפסת את הטקסט שלך!'],
      hints: ['זכור להשתמש בגרשיים סביב הטקסט', 'הטקסט בתוך ה־print צריך להיות בתוך סוגריים', 'אתה יכול להדפיס כל טקסט שאתה רוצה!'],
      challenge: 'הדפס את השם שלך! למשל: print("שלום, אני גיא!")',
      solutionCode: 'print("שלום עולם!")\nprint("שלום, אני גיא!")',
    },
  },
  {
    slug: 'variables',
    title: 'משתנים - קופסאות קסם',
    emoji: '📦',
    description: 'למד כיצד לשמור נתונים במשתנים',
    difficulty: 'easy',
    duration: 8,
    order: 2,
    color: 'from-blue-400 to-cyan-400',
    content: {
      introduction: 'משתנים הם כמו קופסאות שמכילות נתונים. בשיעור זה תלמד ליצור ולהשתמש במשתנים.',
      steps: ['משתנה הוא שם לתא זיכרון שמחזיק ערך', 'הקצה ערך למשתנה באמצעות סימן =', 'לדוגמה: name = "גיא"', 'הדפס את הערך עם print(name)'],
      hints: ['שמות משתנים מתחילים באות או קו תחתון', 'אי אפשר להשתמש ברווח בשם משתנה', 'תן שמות שמתארים את הערך'],
      challenge: 'צור משתנה עם השם שלך והדפס אותו',
      solutionCode: 'name = "גיא"\nprint(name)',
    },
  },
  {
    slug: 'numbers',
    title: 'חשבון עם פייתון',
    emoji: '🔢',
    description: 'חיבור, חיסור, כפל וחילוק עם פייתון',
    difficulty: 'easy',
    duration: 10,
    order: 3,
    color: 'from-purple-400 to-violet-400',
    content: {
      introduction: 'בשיעור זה תלמד כיצד לעבוד עם מספרים ולבצע חישובים בפייתון.',
      steps: ['בפייתון יש מספרים שלמים ועשרוניים', 'חיבור +, חיסור -, כפל *, חילוק /', 'לדוגמה: 5 + 3 שווה 8', 'שמור תוצאה במשתנה והדפס'],
      hints: ['סדר הפעולות כמו במתמטיקה', 'אפשר להדפיס חישוב ישירות', 'חילוק / תמיד מחזיר מספר עשרוני'],
      challenge: 'חשב כמה חודשים חיית! (הגיל שלך כפול 12)',
      solutionCode: 'age = 10\nmonths = age * 12\nprint(months)',
    },
  },
  {
    slug: 'strings',
    title: 'טקסט וחיבור מחרוזות',
    emoji: '📝',
    description: 'עבוד עם טקסט וחבר מחרוזות ביחד',
    difficulty: 'medium',
    duration: 10,
    order: 4,
    color: 'from-green-400 to-emerald-400',
    content: {
      introduction: 'מחרוזת היא רצף של תווים. בשיעור זה תלמד לחבר מחרוזות ולעבוד עם טקסט.',
      steps: ['מחרוזת מוגדרת עם גרשיים', 'חבר מחרוזות עם +', '"שלום" + " " + "גיא" = "שלום גיא"', 'חזור על מחרוזת עם *'],
      hints: ['אל תשכח רווח בין מחרוזות', 'אפשר לחבר משתנים עם מחרוזות', '"הא" * 3 = "האהאהא"'],
      challenge: 'צור את השם המלא שלך מחיבור שני משתנים',
      solutionCode: 'first = "גיא"\nlast = "כהן"\nfull = first + " " + last\nprint(full)',
    },
  },
  {
    slug: 'if-else',
    title: 'אם... אז...',
    emoji: '🔀',
    description: 'למד לכתוב קוד שמקבל החלטות',
    difficulty: 'medium',
    duration: 12,
    order: 5,
    color: 'from-yellow-400 to-amber-400',
    content: {
      introduction: 'תנאי if מאפשר לקוד להחליט מה לעשות. כמו "אם יש גשם, קח מטריה".',
      steps: ['if בודק אם תנאי נכון', 'אם נכון - הקוד בפנים רץ', 'אם לא - הקוד מדולג', 'השתמש ב == > < להשוואה'],
      hints: ['== להשוואה (לא = שזה השמה)', '> גדול מ, < קטן מ', 'הקוד בתוך if חייב להיות מוזח'],
      challenge: 'כתוב תנאי שבודק אם מספר גדול מ-10',
      solutionCode: 'number = 15\nif number > 10:\n    print("גדול מ-10!")\nelse:\n    print("קטן מ-10")',
    },
  },
  {
    slug: 'loops',
    title: 'לולאות - שוב ושוב!',
    emoji: '🔄',
    description: 'למד לחזור על פעולות בקלות',
    difficulty: 'medium',
    duration: 12,
    order: 6,
    color: 'from-red-400 to-pink-400',
    content: {
      introduction: 'לולאות מאפשרות לחזור על קוד מספר פעמים. חיסכון ענק!',
      steps: ['for חוזר על קוד מספר פעמים', 'range(5) = מספרים 0 עד 4', 'i עוקב אחרי הספירה', 'אפשר להשתמש ב-i בתוך הלולאה'],
      hints: ['אל תשכח : בסוף שורת for', 'הקוד בתוך הלולאה חייב להיות מוזח', 'range(1, 11) = מספרים 1 עד 10'],
      challenge: 'כתוב לולאה שמדפיסה את לוח הכפל של 5',
      solutionCode: 'for i in range(1, 11):\n    print(f"5 x {i} = {5 * i}")',
    },
  },
];

export function getLessonBySlug(slug: string): Lesson | undefined {
  return lessonsData.find((l) => l.slug === slug);
}

export function getNextLesson(currentSlug: string): Lesson | undefined {
  const current = getLessonBySlug(currentSlug);
  if (!current) return undefined;
  return lessonsData.find((l) => l.order === current.order + 1);
}

export function getAllLessons(): Lesson[] {
  return lessonsData;
}
