import UnicornScene from "unicornstudio-react/next"

export default function UnicornHero() {
  return (
    <div className="w-full">
      <UnicornScene
        projectId="aWqHZNM0AaLhK9O2gexn?update=1.0.1"
        width="100vw"
        height="100vh"
        scale={1}
        dpi={0.5}
        fps={30}
        altText="Animated background scene"
        ariaLabel="Animated background scene"
        className="opacity-30"
        lazyLoad={true}
        production={true}
      />
    </div>
  )
}