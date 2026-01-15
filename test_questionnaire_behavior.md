# Questionnaire Behavior Analysis

## Current Implementation

Both `forward.js` and `reverse.js` questionnaires have consistent behavior:

1. **Selection Handling**: When a user selects an option, it's stored in `selectedValue`
2. **Validation**: User must select an option before proceeding
3. **Data Storage**: Selected value is saved to globalData
4. **Navigation**: When moving to next question, `selectedValue` is reset to empty string

## UX Best Practices

The current behavior aligns with standard questionnaire UX best practices:

✅ **Clear Selection**: Each question should have an explicit selection
✅ **Avoid Accidental Submissions**: Carrying over selections could lead to users accidentally submitting the same answer for multiple questions
✅ **Focus on Current Question**: Resetting the selection helps users focus on the current question without distractions from previous selections
✅ **Validation**: Users are properly prompted to make a selection before proceeding

## Should Selections Be Carried Over?

**Recommendation**: No, the current behavior is correct.

**Reasons**:
- Users might not notice the selection carried over and accidentally submit incorrect answers
- Each question is independent and requires its own thoughtful selection
- The validation ensures users don't skip questions
- The reset behavior is consistent with most professional questionnaires

## Code Analysis

The key line that resets the selection is in both files:
```javascript
selectedValue: ''
```

This is set when navigating to the next question in the `setData` call. This intentional reset ensures each question starts fresh.

## Conclusion

The current implementation is working correctly and follows good UX principles. No changes are needed to the selection handling behavior.