import { useState } from 'react';

export default function Toggle({ children, init }) {
    const [on, setOn] = useState(init);
    const toggle = () => setOn(!on);
    return children({
        on,
        toggle
    });
}
