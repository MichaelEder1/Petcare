<div id="pet_container">
    <div class="grid grid-cols-2 gap-4 mx-2">
        <h1 class="text-8xl flex place-items-center petcareHeading mx-auto"><%>hello_iam<%> <&>name<&></h1>
        <figure>
            <img src="<&>image<&>" alt="<&>name<&>" class="flex justify-center mx-auto w-2/3 place-items-center">
            <figcaption class="mx-auto w-2/3"><%>this_is<%> <b><&>name<&></b>. <&>name<&> <%>is<%> <b><&>age<&>
                    <%>years<%></b> <%>old_and_is_looking_for_a_new_home<%>.
            </figcaption>
        </figure>
    </div>
</div>
<div id="pet_description" class="mt-4">
    <div id="pet_info_container" class="mx-auto py-4">
        <h2 class="petcareHeading text-4xl mb-4"><%>about_me<%></h2>
        <p class="text-2xl text-justify"><&>bio<&></p>
        <h2 class="petcareHeading text-4xl mb-4 pt-4"><%>some_facts_on_me<%></h2>
        <p class="text-2xl"><span class="font-semibold"><%>gender<%>: </span><&>gender<&></p>
        <p class="text-2xl"><span class="font-semibold"><%>color<%>: </span><&>color<&></p>
        <p class="text-2xl"><span class="font-semibold"><%>age<%>: </span><&>age<&> <%>years<%></p>
        <p class="text-2xl"><span class="font-semibold"><%>coat<%>: </span><&>coat<&></p>
        <p class="text-2xl"><span class="font-semibold"><%>weight<%>: </span><&>weight<&> kilos</p>
        <p class="text-2xl"><span class="font-semibold"><%>size<%>: </span><&>size<&></p>
        <p class="text-2xl"><span class="font-semibold"><%>favourite_food<%>: </span><&>food<&> <i><%>yummy<%></i></p>
        <p class="text-2xl"><span class="font-semibold"><%>characteristics<%>: </span><&>characteristic<&></p>
    </div>
    <button class="border-2 text-white px-4 py-4 mt-8 flex justify-center rounded-md mx-auto"><%>give_me_a_home<%>
    </button>
</div>
<div class="mt-8 p-4 bg-yellow-100 rounded-md">
    <h1 class="text-4xl petcareHeading my-4"><%>comments<%></h1>
    <form action="#" method="POST">
        <textarea cols="4" class="w-full p-4" id="inputComment"
                  placeholder="<%>what_do_you_want_to_know_about<%> <&>name<&> ..."
                  required></textarea>
        <button type="button" id="sendComment" class="my-4"><%>send<%></button>
        <div id="comments"></div>
    </form>
</div>
<p class="text-sm w-2/3"><%>to_delete_comment_just_click_it<%></p>

