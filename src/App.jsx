import Form, { FormUI } from "./components/Form";
import bg from "../assets/images/bg-sidebar-desktop.svg";
import body from "./form";

function App() {
  return (
    <div className="min-h-screen bg-[#eef5ff] flex items-center justify-center font-roboto">
      <section className="bg-white h-[500px] w-[850px] shadow-lg rounded-xl p-3 flex items-center justify-between">
        <Form body={body}>
          <div className="h-full w-[35%] relative">
            <img className="h-full" src={bg} alt="" />
            <div className="absolute left-6 top-8">
              <FormUI.Etapas type="col" className="text-color-500" />
            </div>
          </div>
          <div className="h-full w-[80%] py-8 px-16">
            <FormUI.Body />
          </div>
        </Form>
      </section>
    </div>
  );
}

export default App;
