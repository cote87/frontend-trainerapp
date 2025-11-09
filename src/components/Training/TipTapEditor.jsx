import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import TextAlign from '@tiptap/extension-text-align'
import { useState, useEffect } from 'react'
import 'prosemirror-view/style/prosemirror.css';

export const TiptapEditor = ({ content, setContent }) => {
    const [colorInput, setColorInput] = useState('#000000')
    const [updateKey, setUpdateKey] = useState(0)

    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            Color,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content,
        onUpdate({ editor }) {
            const html = editor.getHTML();
            if (html.length <= 10000) {
                setContent(html);
            } else {
                alert("Has alcanzado el límite de 10.000 caracteres.");
            }
        },
        onSelectionUpdate({ editor }) {
            setUpdateKey(k => k + 1) // se dispara cuando cambia la selección
        },
    })

    if (!editor) return null

    // Sincroniza el color del texto seleccionado
    useEffect(() => {
        if (!editor) return
        const color = editor.getAttributes('textStyle').color || '#000000'
        setColorInput(color)
    }, [updateKey, editor])

    const handleColorChange = (color) => {
        setColorInput(color)
        editor.chain().focus().setColor(color).run()
        setUpdateKey(k => k + 1) // fuerza actualizar botones
    }

    const btnClass = (active) =>
        active ? 'btn btn-primary' : 'btn btn-outline-secondary'

    const handleClick = (command) => {
        command()
        setUpdateKey(k => k + 1) // fuerza que se actualicen los botones
    }

    return (
        <div className="mb-3">
            {/* Formato de texto */}
            <div className="btn-group mb-2" role="group">
                <button
                    title="Negrita"
                    type="button"
                    className={btnClass(editor.isActive('bold'))}
                    onClick={() => handleClick(() => editor.chain().focus().toggleBold().run())}
                ><b>B</b></button>

                <button
                    title="Cursiva"
                    type="button"
                    className={btnClass(editor.isActive('italic'))}
                    onClick={() => handleClick(() => editor.chain().focus().toggleItalic().run())}
                ><i>K</i></button>

                <button
                    title="Subrayado"
                    type="button"
                    className={btnClass(editor.isActive('underline'))}
                    onClick={() => handleClick(() => editor.chain().focus().toggleUnderline().run())}
                ><u>U</u></button>

                <button
                    title="Tachado"
                    type="button"
                    className={btnClass(editor.isActive('strike'))}
                    onClick={() => handleClick(() => editor.chain().focus().toggleStrike().run())}
                ><s>S</s></button>
            </div>

            {/* Selector de color */}
            <div className="btn-group mb-2 mx-2" role="group">
                <input
                    type="color"
                    value={colorInput}
                    onChange={e => handleColorChange(e.target.value)}
                    title="Color de texto"
                    style={{
                        width: '36px',
                        height: '36px',
                        padding: 0,
                        borderRadius: 0,
                        border: '1px solid #ccc',
                        cursor: 'pointer',
                    }}
                />
            </div>

            {/* Alineación */}
            <div className="btn-group mb-2" role="group">
                <button
                    type="button"
                    className={btnClass(editor.isActive({ textAlign: 'left' }))}
                    onClick={() => handleClick(() => editor.chain().focus().setTextAlign('left').run())}
                ><i className="bi bi-text-left"></i></button>

                <button
                    type="button"
                    className={btnClass(editor.isActive({ textAlign: 'center' }))}
                    onClick={() => handleClick(() => editor.chain().focus().setTextAlign('center').run())}
                ><i className="bi bi-text-center"></i></button>

                <button
                    type="button"
                    className={btnClass(editor.isActive({ textAlign: 'right' }))}
                    onClick={() => handleClick(() => editor.chain().focus().setTextAlign('right').run())}
                ><i className="bi bi-text-right"></i></button>

                <button
                    type="button"
                    className={btnClass(editor.isActive({ textAlign: 'justify' }))}
                    onClick={() => handleClick(() => editor.chain().focus().setTextAlign('justify').run())}
                ><i className="bi bi-text-paragraph"></i></button>
            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className="tiptap-editor"
                style={{
                    border: '1px solid #ced4da',
                    borderRadius: '0.375rem',
                    padding: '1rem',
                    minHeight: '500px',
                    backgroundColor: '#fff',
                    whiteSpace: 'pre-wrap',
                }}
                onClick={() => editor?.chain().focus().run()}
            />
        </div>
    )
}
