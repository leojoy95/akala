import * as ac from '@akala/commands'

export default new ac.Trigger('keybinding', (container) =>
{
    var chord = container;
    document.addEventListener('keydown', (ev) =>
    {
        var sequence = '';
        if (ev.ctrlKey)
            sequence += 'Ctrl+';
        if (ev.metaKey)
            sequence += 'Meta+';
        if (ev.shiftKey)
            sequence += 'Shift+';
        if (ev.altKey)
            sequence += 'Alt+';
        sequence += ev.key;

        var cmd = container.resolve(sequence);
        if (chord !== container && !cmd)
        {
            console.error('no command matches ' + chord.name + ', ' + sequence);
            return;
        }
        if (!cmd)
        {
            console.error('no command matches ' + sequence);
            return;
        }
        if (cmd instanceof ac.Container)
        {
            chord = cmd;
        }
        container.dispatch(cmd);
    })
})