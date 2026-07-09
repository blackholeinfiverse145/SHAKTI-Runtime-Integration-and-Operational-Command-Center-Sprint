import DashboardLayout from "../layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
<main className="p-6">

  <h1 className="text-3xl font-bold mb-8">
    SHAKTI Operational Command Center
  </h1>

  <div className="grid grid-cols-12 gap-6">

    <section className="col-span-12 bg-white rounded-xl p-6 shadow">
      Executive Summary
    </section>

    <section className="col-span-8 bg-white rounded-xl p-6 shadow h-80">
      National Grid Status
    </section>

    <section className="col-span-4 bg-white rounded-xl p-6 shadow h-80">
      Live Alert Queue
    </section>

    <section className="col-span-6 bg-white rounded-xl p-6 shadow h-72">
      Risk Heatmap
    </section>

    <section className="col-span-6 bg-white rounded-xl p-6 shadow h-72">
      Forecast Panel
    </section>

    <section className="col-span-6 bg-white rounded-xl p-6 shadow h-72">
      Incident Queue
    </section>

    <section className="col-span-6 bg-white rounded-xl p-6 shadow h-72">
      Operational Timeline
    </section>

    <section className="col-span-6 bg-white rounded-xl p-6 shadow h-60">
      System Health
    </section>

    <section className="col-span-6 bg-white rounded-xl p-6 shadow h-60">
      Replay Status
    </section>

    <section className="col-span-12 bg-white rounded-xl p-6 shadow h-64">
      Evidence Panel
    </section>

  </div>

</main>
    </DashboardLayout>
  );
}