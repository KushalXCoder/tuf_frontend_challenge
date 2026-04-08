import { Calender } from "./components/calender";

const Home = () => {
  return (
    <main className="min-h-screen w-full px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full items-center justify-center sm:min-h-[calc(100vh-5rem)]">
        <Calender />
      </div>
    </main>
  )
}

export default Home;