export default function sanitize(input) {
    // Remove leading and trailing white spaces
    if (!input) return undefined;

    const trimmedInput = input.trim();

    // Remove HTML tags and escape HTML characters to prevent XSS attacks
    const sanitizedInput = trimmedInput.replace(/<[^>]*>/g, '').replace(/[&<>"']/g, function(match) {
        switch (match) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case "'":
                return '&#039;';
            default:
                return match;
        }
    });

    return sanitizedInput;
}