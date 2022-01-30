<template>
    <div class="editor__nav editor__nav--top ql-toolbar ql-snow" id="quillToolbar">
        <QuillFormats>
            <QuillButton name="bold" />
            <QuillButton name="italic" />
            <QuillButton name="underline" />
            <QuillButton name="strike" />
        </QuillFormats>
        <QuillFormats>
            <QuillButton name="blockquote" />
            <QuillButton name="code-block" />
        </QuillFormats>
        <QuillFormats>
            <QuillButton name="header" value="1" />
            <QuillButton name="header" value="2" />
        </QuillFormats>
        <QuillFormats>
            <QuillButton name="list" value="ordered" />
            <QuillButton name="list" value="bullet" />
        </QuillFormats>
        <QuillFormats>
            <QuillButton name="script" value="sub" />
            <QuillButton name="script" value="super" />
        </QuillFormats>
        <QuillFormats>
            <QuillButton name="indent" value="+1" />
            <QuillButton name="indent" value="-1" />
        </QuillFormats>
        <QuillFormats>
            <QuillButton name="list" value="ordered" />
            <QuillButton name="list" value="bullet" />
        </QuillFormats>
        <QuillFormats>
            <QuillSelect
                name="size"
                :options="[
                    {
                        value: 'small',
                        selected: false,
                    },
                    {
                        selected: true,
                    },
                    {
                        value: 'large',
                        selected: false,
                    },
                    {
                        value: 'huge',
                        selected: false,
                    },
                ]"
            />
        </QuillFormats>
        <QuillFormats>
            <QuillSelect
                name="header"
                :options="[
                    {
                        value: '1',
                        selected: false,
                    },
                    {
                        value: '2',
                        selected: false,
                    },
                    {
                        value: '3',
                        selected: false,
                    },
                    {
                        value: '4',
                        selected: false,
                    },
                    {
                        value: '5',
                        selected: false,
                    },
                    {
                        value: '6',
                        selected: false,
                    },
                    {
                        selected: true,
                    },
                ]"
            />
        </QuillFormats>
        <QuillFormats>
            <QuillSelect
                name="font"
                :options="[
                    {
                        selected: true,
                    },
                    {
                        value: 'serif',
                        selected: false,
                    },
                    {
                        value: 'monospace',
                        selected: false,
                    },
                ]"
            />
        </QuillFormats>
        <QuillFormats>
            <QuillSelect
                name="align"
                :options="[
                    {
                        selected: true,
                    },
                    {
                        value: 'center',
                        selected: false,
                    },
                    {
                        value: 'right',
                        selected: false,
                    },
                    {
                        value: 'justify',
                        selected: false,
                    },
                ]"
            />
        </QuillFormats>
        <QuillFormats>
            <QuillButton name="clean" />
        </QuillFormats>
        <QuillFormats>
            <QuillButton name="link" />
            <QuillButton name="image" />
            <QuillButton name="video" />
        </QuillFormats>
    </div>
</template>

<script>
import QuillFormats from "./QuillFormats";
import QuillButton from "./QuillButton";
import QuillSelect from "./QuillSelect";

export default {
    components: {
        QuillFormats,
        QuillButton,
        QuillSelect,
    },
};
</script>
