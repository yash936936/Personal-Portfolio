import PageHeader from "../components/PageHeader";

export default function LegalNotice() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Legal notice" />
      <section className="container" style={{ paddingBottom: 96, maxWidth: 760 }}>
        <p style={{ color: "var(--color-muted)", fontSize: 15, lineHeight: 1.7 }}>
          Placeholder legal notice. Replace with your actual site operator details, hosting
          provider, and any required disclosures for your jurisdiction.
        </p>
      </section>
    </>
  );
}
