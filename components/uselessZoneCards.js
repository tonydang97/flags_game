import requests from "../utils/requests";

export default function ZoneCard(request) {
  return (
    <div class="w-full md:w-1/2 xl:w-1/3 px-4">
      <div class="bg-white rounded-lg overflow-hidden mb-10">
        <img src={requests[key].image} alt="image" class="w-full" />
        <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
          <h3>
            <p
              class="
                font-semibold
                text-dark text-xl
                sm:text-[22px]
                md:text-xl
                lg:text-[22px]
                xl:text-xl
                2xl:text-[22px]
                mb-4
                block
                "
            >
              {requests[key].title}
            </p>
          </h3>

          <button
            onClick={test}
            class="inline-block py-2 px-7 border border-[#E5E7EB] rounded-full text-base text-body-color font-medium hover:border-primary hover:bg-primary hover:text-white  transition  "
          >
            Jouer
          </button>
        </div>
      </div>
    </div>
  );
}
