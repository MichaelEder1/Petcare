<div class="grid grid-cols-2 gap-4 mx-auto">
    <h1 class="text-8xl flex justify-evenly place-items-center petcareHeading"><%>adopt<%> <%>a_cat<%></h1>
    <div class="grid grid-cols-8 gap-4">
        <img src="images/header_images/cat.png" alt="black cat" class="col-start-3 col-end-6">
    </div>
</div>
<div class="flex flex-row justify-between mt-8 mb-4 items-center w-2/3">
    <label for="sort" class="mr-3 font-bold text-xl"><%>sort<%></label>
    <select id="sort" name="sort" class="text-2xl">
        <option value="asc" selected><%>ascending<%></option>
        <option value="desc"><%>descending<%></option>
    </select>
    <label for="filter" class="ml-4 mr-3 font-bold text-xl"><%>coat<%></label>
    <select id="filter" name="filter" class="text-xl">
        <option value="4"><%>all<%></option>
    </select>
</div>
<div class="flex flex-wrap justify-center overflow-hidden md:-mx-4 lg:-mx-4 xl:-mx-4" id="cats"></div>
<div id="loadMoreButton"></div>
<button id="loadMore" class="w-2/3 flex justify-center mx-auto"><%>show_more_cats<%></button>