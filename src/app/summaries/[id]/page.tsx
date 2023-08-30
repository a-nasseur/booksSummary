import fetchOneSummary from "@/lib/FetchOneSummary";


export default async function Page({ params }: { params: { id: string } }) {
  const data: Summary = await fetchOneSummary(params.id); 

  return (
    <div className="">
      <div className="px-6 md:w-[750px] md:mx-auto p-6 md:my-10">
        <div className="border-b-[1px] border-gray-300 py-6 flex items-center gap-4">
          <h1 className="text-xl font-semibold text-secondary">Book title: </h1>
          <span className="text-lg">{data.title}</span>
        </div>
        <div className="border-b-[1px] border-gray-300 py-6 flex items-center gap-4">
          <h1 className="text-xl font-semibold text-secondary">Author: </h1>
          <span className="text-lg">{data.author}</span>
        </div>
        <div className="border-b-[1px] border-gray-300 py-6 flex items-center gap-4">
          <h1 className="text-xl font-semibold text-secondary">Edition: </h1>
          <span className="text-lg">{data.edition}</span>
        </div>
        <div className="border-b-[1px] border-gray-300 py-6 flex items-center gap-4">
          <h1 className="text-xl font-semibold text-secondary">Number of pages: </h1>
          <span className="text-lg">{data.pages}</span>
        </div>
        <div className="border-b-[1px] py-6">
          <h1 className="text-xl font-semibold text-secondary">Read the summary: </h1>
          <p className="pt-4">{data.summary}</p>
        </div>
      </div>
    </div>
  )
}