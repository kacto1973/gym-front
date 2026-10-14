import React from "react";

const AdminPage = () => {
  return (
    <main className="bg-[#D5DEE7]">
      {/*Header*/}
      <header className="flex justify-between mx-10 my-5 items-center">
        <div className="gap-3 flex flex-row items-center">
          <img src="/dumbbell.svg" alt="logo" width={60} />
          <h1 className="text-xl font-bold">GYM DESKTOP MANAGER</h1>
        </div>
        <div className="flex flex-row items-center gap-3">
          <div className="font-bold rounded-full w-[30px] h-[30px] bg-green-600 flex items-center justify-center">
            <span className="text-green-800">LA</span>
          </div>
          <span className="rounded-full px-2 py-1 bg-blue-300 text-blue-500">
            settings
          </span>
        </div>
      </header>
      <div>
        {/*Search bar*/}
        <div classname="">
          <div></div>
        </div>
        {/*Client container*/}
        <div></div>
      </div>
    </main>
  );
};

export default AdminPage;
