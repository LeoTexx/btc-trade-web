import { useCallback, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useSSE } from "./hooks";
import { Success, Form } from "./components";

function App() {
  const [paymentData, setPaymentData] = useState<InvoicePaidResponse | null>(
    null
  );
  const onEvent = useCallback((event: MessageEvent) => {
    const data = JSON.parse(event.data);
    if (data?.type === "invoice_paid") {
      setPaymentData(data);
    }
  }, []);

  useSSE("http://localhost:3000/events", onEvent);

  return (
    <main className="w-screen h-screen flex items-center justify-center   bg-gradient-to-b from-[#25d8bd] to-[#ffc95e]">
      <section className="max-w-screen-xl mx-auto p-8 text-center bg-[#F9F7FC] rounded-xl shadow-xl">
        {paymentData ? <Success paymentData={paymentData} /> : <Form />}
        <Toaster />
      </section>
    </main>
  );
}

export default App;
