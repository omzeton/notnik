<template>
    <div class="writing-wrapper__text">
        <div class="text-wrapper">
            <div class="text-wrapper__title">
                <p>Lorem ipsum</p>
            </div>
            <div class="text-wrapper__date">
                <p>2020 - 10 - 27</p>
            </div>
            <div class="text-wrapper__body">
                <p class="text-wrapper__body__text" contenteditable="true" spellcheck="false">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in quam sit amet eros elementum iaculis. Donec quis neque sodales, commodo massa quis, efficitur neque. Nulla non
                    porta erat. Nunc vel libero convallis, egestas urna vitae, ultrices est. Mauris sagittis pulvinar imperdiet. Sed lacinia lorem quis eleifend semper. Nullam euismod leo in suscipit
                    ullamcorper. Fusce interdum massa quis lectus dictum fermentum. Quisque nisl turpis, tempor non accumsan in, interdum vitae nisl. Sed eros orci, vestibulum et egestas fermentum,
                    vestibulum a dolor. Nullam interdum turpis a sodales hendrerit. Integer vel tristique purus. Maecenas aliquam vulputate enim. Integer ac pulvinar tortor. Proin arcu enim, dictum a
                    dignissim sed, consectetur eu eros. Morbi eros massa, convallis et molestie eu, varius et enim. Praesent dui sapien, dictum at mauris non, facilisis accumsan diam. Nulla facilisi.
                    Morbi mollis pulvinar molestie. Pellentesque a mauris vel mi rutrum faucibus. Cras sollicitudin condimentum porttitor. Nullam iaculis, urna ac varius porttitor, magna felis aliquet
                    quam, suscipit varius orci sapien sagittis magna. Sed eu sem congue magna volutpat malesuada. Phasellus quis orci erat. Morbi consectetur urna in velit ullamcorper, eu egestas
                    lectus aliquet. Suspendisse lacinia nibh et ex facilisis, in pharetra tellus facilisis. Quisque id consectetur risus. Morbi ut porta metus, vitae venenatis purus. Proin metus urna,
                    scelerisque id eleifend ut, suscipit at mauris. Nunc arcu nulla, interdum at risus eu, mollis suscipit arcu. Nulla ornare dui non tristique feugiat. Nam pulvinar, nunc a
                    pellentesque fermentum, odio arcu pretium sapien, in mattis velit diam eget magna. Cras velit tellus, efficitur suscipit blandit vitae, condimentum at dui. Vivamus et enim sed erat
                    congue convallis at et neque. Nunc ornare id tellus eget condimentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Class aptent
                    taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque eget justo sit amet enim porttitor pharetra sit amet sit amet erat. Sed egestas, lacus sed
                    cursus ornare, massa leo dignissim orci, vitae ornare massa magna ut odio. Proin euismod turpis quis augue sagittis, vel mattis ex feugiat. Proin condimentum blandit risus at
                    ornare. Quisque lobortis est dui, malesuada facilisis ipsum consectetur id. Pellentesque vehicula ultricies eros non eleifend. Etiam aliquet sapien urna, ut elementum tortor
                    fermentum ut. Nulla facilisi. Donec ut enim quis turpis viverra pretium. Nam a odio sollicitudin risus volutpat scelerisque. Nunc a fermentum nisl, quis fringilla lacus. Mauris eu
                    orci ac nisl aliquam interdum. In quis nibh at sem pellentesque gravida quis a velit. Aliquam vel rutrum augue. Praesent venenatis nisi aliquet, placerat ante a, maximus purus.
                    Nullam at lacinia diam. Ut ornare est vitae sem egestas malesuada eget sed quam. Sed aliquam at leo eu dignissim. Donec id dui consectetur, rhoncus dui vitae, venenatis turpis.
                    Nunc in dolor fringilla tortor malesuada finibus at nec lorem. Vestibulum eget ligula quam. Integer a blandit turpis. Pellentesque sed nibh quis tortor ultricies viverra dictum et
                    neque. Ut faucibus eget ex et tristique. Maecenas efficitur orci quam, non posuere lectus elementum ac. Quisque vitae tortor pulvinar elit sollicitudin accumsan quis a purus.
                    Aliquam eget sodales orci, in faucibus dolor. Integer rutrum augue a augue elementum, eget rhoncus turpis commodo. Proin sollicitudin et urna ut dignissim. Nunc efficitur nisi
                    vitae blandit laoreet. Fusce ut ex ultrices, ultrices nulla in, tempus turpis.
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.writing-wrapper__text {
    position: relative;
    width: 100%;
    height: 74%;
    padding: 90px 200px;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-y: scroll;
    .text-wrapper {
        color: $w;
        &__title {
            height: 90px;
            display: flex;
            align-items: center;
            font-size: 60px;
            font-family: $bold;
        }
        &__date {
            font-size: 14px;
            margin-top: -12px;
            font-family: $light;
        }
        &__body {
            margin-top: 60px;
            height: 920px;
            line-height: 2;
            margin-bottom: 520px;
            font-family: $light;
            font-size: 18px;
            &__text {
                outline: none;
            }
        }
    }
}
</style>
