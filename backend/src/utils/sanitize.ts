import sanitizeHtml from 'sanitize-html';

export const sanitize = (input: string): string => {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: {},
  });
};