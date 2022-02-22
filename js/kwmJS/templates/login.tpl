<div id="login">
    <h1 class="flex justify-center text-4xl font-black font-hero tracking-wide mx-auto pb-8 mt-4 petcareHeading">
        <%>welcomeMessage<%> - <%>login<%></h1>
    <form class="w-full max-w-sm mx-auto" autocomplete="on">
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 text-left"
                       for="username">
                    <%>username<%>
                </label>
            </div>
            <div class="md:w-2/3">
                <input class="bg-gray-200 dark:bg-gray-300 dark:text-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none dark:focus:bg-gray-200 focus:bg-white focus:border-blue-500"
                       id="username" type="text" placeholder="Jane Doe" autocomplete="username">
            </div>
        </div>
        <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
                <label class="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 text-left"
                       for="password">
                    <%>password<%>
                </label>
            </div>
            <div class="md:w-2/3">
                <input class="bg-gray-200 dark:bg-gray-300 dark:text-gray-100 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white dark:focus:bg-gray-200 focus:border-blue-500"
                       id="password" type="password" placeholder="******************" autocomplete="password">
            </div>
        </div>
        <div class="md:flex md:items-center">
            <div class="md:w-1/3"></div>
            <div class="md:w-2/3">
                <button class="shadow bg-blue-400 hover:bg-blue-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded dark:bg-gray-500 dark:text-white dark:hover:bg-gray-600"
                        type="button" id="login-submit">
                    <%>login<%>
                </button>
            </div>
        </div>
    </form>
    <p class="w-2/3 flex mx-auto justify-center font-bold mt-5"><%>dont_have_an_account<%> <a class="hover:text-red-700"
                                                                                        href="#/register"> <%>register<%></a>
    </p>
</div>