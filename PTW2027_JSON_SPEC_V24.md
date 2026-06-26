# PTW 2027 Supported JSON Format v24

This schema only lists question types currently supported by the PTW 2027 browser exam system.
Unsupported types are rejected during import to avoid broken exams.

## Supported question types

- multiple_choice
- multiple_select
- true_false
- yes_no_not_given
- fill_blank
- short_answer
- matching
- heading_matching
- listening
- reading
- writing
- speaking

## Not currently supported

Do not generate these until the UI is implemented:

- sentence_completion
- table_completion
- note_completion
- summary_completion
- diagram_label
- map_label
- drag_drop
- ordering

## Full exam JSON

```json
{
  "schemaVersion": "PTW-2027-v24",
  "exam": {
    "title": "PTW 2027 Mock Test 1",
    "code": "PTW-MOCK-001",
    "version": "1.0",
    "durationMinutes": 180,
    "status": "upcoming",
    "date": "2027-01-01",
    "startTime": "09:00",
    "endTime": "12:00",
    "sections": [
      {
        "id": "reading",
        "title": "Reading",
        "type": "reading",
        "durationMinutes": 60,
        "questions": []
      }
    ]
  }
}
```

## Common question fields

```json
{
  "id": "R1",
  "type": "multiple_choice",
  "section": "Reading",
  "number": 1,
  "points": 1,
  "prompt": "Question text here",
  "correctAnswer": "A"
}
```

Aliases accepted by importer:
- prompt: question, text, title, task
- options: choices
- correctAnswer: answer, correct_answer
- audioUrl: audio_url
- wordLimit: word_limit
- prepTime: prep_time
- recordTime: record_time
- leftItems: left_items, paragraphs, items, left
- rightItems: right_items, headings, right, choices, options
- matchingInstructions: matching_instructions, instructions

## multiple_choice

```json
{
  "id": "R1",
  "type": "multiple_choice",
  "section": "Reading",
  "number": 1,
  "points": 1,
  "passageTitle": "Passage 1",
  "passage": "Optional reading passage text.",
  "prompt": "What is the main idea?",
  "options": [
    { "id": "A", "text": "Option A" },
    { "id": "B", "text": "Option B" },
    { "id": "C", "text": "Option C" },
    { "id": "D", "text": "Option D" }
  ],
  "correctAnswer": "B"
}
```

## multiple_select

correctAnswer should be an array or a JSON-stringified array. The importer accepts arrays.

```json
{
  "id": "R2",
  "type": "multiple_select",
  "section": "Reading",
  "number": 2,
  "points": 2,
  "prompt": "Which TWO statements are correct?",
  "options": ["A statement", "B statement", "C statement", "D statement"],
  "correctAnswer": ["A", "C"]
}
```

## true_false

Options are automatically generated if omitted: TRUE, FALSE, NOT_GIVEN.

```json
{
  "id": "R3",
  "type": "true_false",
  "section": "Reading",
  "number": 3,
  "points": 1,
  "passage": "Optional reading passage text.",
  "prompt": "The author says the project was completed in 2027.",
  "correctAnswer": "NOT_GIVEN"
}
```

## yes_no_not_given

Options are automatically generated if omitted: YES, NO, NOT_GIVEN.

```json
{
  "id": "R4",
  "type": "yes_no_not_given",
  "section": "Reading",
  "number": 4,
  "points": 1,
  "prompt": "The writer believes online tests are more convenient.",
  "correctAnswer": "YES"
}
```

## fill_blank

```json
{
  "id": "L1",
  "type": "fill_blank",
  "section": "Listening",
  "number": 1,
  "points": 1,
  "audioUrl": "https://example.com/audio.mp3",
  "prompt": "Complete the sentence: The meeting begins at ____.",
  "correctAnswer": "nine"
}
```

## short_answer

```json
{
  "id": "R5",
  "type": "short_answer",
  "section": "Reading",
  "number": 5,
  "points": 1,
  "prompt": "Which organization funded the research?",
  "correctAnswer": "the university"
}
```

## matching

The student matches each left item to one right option ID.
correctAnswer can be an object mapping left item text to right option ID.

```json
{
  "id": "R6",
  "type": "matching",
  "section": "Reading",
  "number": 6,
  "points": 4,
  "prompt": "Match each statement with the correct speaker.",
  "leftItems": [
    "Supports online assessment",
    "Prefers paper-based assessment",
    "Mentions security concerns"
  ],
  "rightItems": [
    { "id": "A", "text": "Speaker A" },
    { "id": "B", "text": "Speaker B" },
    { "id": "C", "text": "Speaker C" }
  ],
  "correctAnswer": {
    "Supports online assessment": "A",
    "Prefers paper-based assessment": "B",
    "Mentions security concerns": "C"
  }
}
```

## heading_matching

Use paragraphs/items on the left and headings on the right.

```json
{
  "id": "R7",
  "type": "heading_matching",
  "section": "Reading",
  "number": 7,
  "points": 4,
  "passage": "Full reading passage here.",
  "prompt": "Choose the correct heading for each paragraph.",
  "leftItems": [
    "Paragraph A",
    "Paragraph B",
    "Paragraph C"
  ],
  "rightItems": [
    { "id": "i", "text": "A change in public opinion" },
    { "id": "ii", "text": "A technical limitation" },
    { "id": "iii", "text": "A historical comparison" }
  ],
  "correctAnswer": {
    "Paragraph A": "iii",
    "Paragraph B": "i",
    "Paragraph C": "ii"
  }
}
```

## listening

Use listening when the main interaction is audio with options.
If audioUrl is included on a multiple_choice question, the UI can also render it as listening.

```json
{
  "id": "L2",
  "type": "listening",
  "section": "Listening",
  "number": 2,
  "points": 1,
  "audioUrl": "https://example.com/listening.mp3",
  "prompt": "Why does the student visit the office?",
  "options": ["To pay a fee", "To change a course", "To ask about housing", "To collect a card"],
  "correctAnswer": "B"
}
```

## reading

Use reading for passage-based multiple-choice style questions.
For passage-based fill_blank / short_answer / matching, set type to that actual question type and include passage.

```json
{
  "id": "R8",
  "type": "reading",
  "section": "Reading",
  "number": 8,
  "points": 1,
  "passageTitle": "The Future of Testing",
  "passage": "Full passage text here.",
  "prompt": "According to the passage, what is one benefit of adaptive testing?",
  "options": ["Speed", "Lower cost", "Better seating", "More handwriting"],
  "correctAnswer": "A"
}
```

## writing

```json
{
  "id": "W1",
  "type": "writing",
  "section": "Writing",
  "number": 1,
  "points": 20,
  "prompt": "Some people believe online exams are more reliable than paper exams. To what extent do you agree or disagree?",
  "wordLimit": 250
}
```

## speaking

```json
{
  "id": "S1",
  "type": "speaking",
  "section": "Speaking",
  "number": 1,
  "points": 20,
  "prompt": "Describe a place where you like to study.",
  "prepTime": 30,
  "recordTime": 90
}
```
