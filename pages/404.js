/* Unknown routes will redirect to home */
export default function Custom404() {
  return (
    <>
      <h1>Page not found</h1>
      <p className="text-xl">If you&apos;re looking for a specific encoded image, please double check the ID.</p>
    </>
  )
}