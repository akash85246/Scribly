const backgrounds = [
    {
      id: "default",
      img: "https://www.transparenttextures.com/patterns/cartographer.png",
      label: "Default",
    },
    {
      id: "gradient",
      img: "https://www.transparenttextures.com/patterns/polonez-pattern.png",
      label: "Polonez Pattern",
    },
    {
      id: "abstract",
      img: "https://www.transparenttextures.com/patterns/3px-tile.png",
      label: "3px Tile",
    },
    {
      id: "fabric-dark",
      img: "https://www.transparenttextures.com/patterns/45-degree-fabric-dark.png",
      label: "Dark Fabric",
    },
    {
      id: "carbon-fiber",
      img: "https://www.transparenttextures.com/patterns/carbon-fibre.png",
      label: "Carbon Fiber",
    },
    {
      id: "wood",
      img: "https://www.transparenttextures.com/patterns/wood-pattern.png",
      label: "Wood Texture",
    },
    {
      id: "denim",
      img: "https://www.transparenttextures.com/patterns/45-degree-fabric-light.png",
      label: "Denim Fabric",
    },
    {
      id: "diamond",
      img: "https://www.transparenttextures.com/patterns/diamond-upholstery.png",
      label: "Diamond Upholstery",
    },
    {
      id: "subtle-dots",
      img: "https://www.transparenttextures.com/patterns/subtle-dots.png",
      label: "Subtle Dots",
    },
    {
      id: "arches",
      img: "https://www.transparenttextures.com/patterns/arches.png",
      label: "Arches",
    },
    {
      id: "cubes",
      img: "https://www.transparenttextures.com/patterns/cubes.png",
      label: "Cubes",
    },
    {
      id: "hexagons",
      img: "https://www.transparenttextures.com/patterns/hexellence.png",
      label: "Hexagons",
    },
    {
      id: "lines",
      img: "https://www.transparenttextures.com/patterns/vertical-cloth.png",
      label: "Vertical Cloth",
    },
    {
      id: "waves",
      img: "https://www.transparenttextures.com/patterns/wavecut.png",
      label: "Wave Cut",
    },
    {
      id: "noise",
      img: "https://www.transparenttextures.com/patterns/noise-pattern-with-subtle-cross-lines.png",
      label: "Noise Pattern",
    },
    {
      id: "grunge",
      img: "https://www.transparenttextures.com/patterns/grunge-wall.png",
      label: "Grunge Wall",
    },
    {
      id: "brushed-metal",
      img: "https://www.transparenttextures.com/patterns/brushed-alum.png",
      label: "Brushed Metal",
    },
    {
      id: "plaid",
      img: "https://www.transparenttextures.com/patterns/my-little-plaid.png",
      label: "Plaid",
    },
    {
      id: "starring",
      img: "https://www.transparenttextures.com/patterns/starring.png",
      label: "Starring",
    },
    {
      id: "woven",
      img: "https://www.transparenttextures.com/patterns/woven.png",
      label: "Woven Fabric",
    },
    {
      id: "dots",
      img: "https://www.transparenttextures.com/patterns/little-knobs.png",
      label: "Dots",
    },
    {
      id: "checkerboard",
      img: "https://www.transparenttextures.com/patterns/checkered-pattern.png",
      label: "Checkerboard",
    },
    {
      id: "leather",
      img: "https://www.transparenttextures.com/patterns/leather.png",
      label: "Leather Texture",
    },
    {
      id: "gplay",
      img: "https://www.transparenttextures.com/patterns/gplay.png",
      label: "Google Play",
    },
    {
      id: "paper",
      img: "https://www.transparenttextures.com/patterns/paper-fibers.png",
      label: "Paper Fibers",
    },
    {
      id: "concrete",
      img: "https://www.transparenttextures.com/patterns/concrete-wall.png",
      label: "Concrete Wall",
    },
    {
      id: "batthern",
      img: "https://www.transparenttextures.com/patterns/batthern.png",
      label: "Batthern",
    },
    {
      id: "floral",
      img: "https://www.transparenttextures.com/patterns/gray-floral.png",
      label: "Floral Pattern",
    },
    {
      id: "psychedelic",
      img: "https://www.transparenttextures.com/patterns/psychedelic.png",
      label: "Psychedelic",
    },
    {
      id: "grid-me",
      img: "https://www.transparenttextures.com/patterns/grid-me.png",
      label: "Grid Me",
    },
    {
      id: "arabesque",
      img: "https://www.transparenttextures.com/patterns/arabesque.png",
      label: "Arabesque",
    },
    {
      id: "arches",
      img: "https://www.transparenttextures.com/patterns/arches.png",
      label: "Arches",
    },
    {
      id: "argyle",
      img: "https://www.transparenttextures.com/patterns/argyle.png",
      label: "Argyle",
    },
    {
      id: "stardust",
      img: "https://www.transparenttextures.com/patterns/stardust.png",
      label: "Stardust",
    },
    {
      id: "black-thread",
      img: "https://www.transparenttextures.com/patterns/black-thread.png",
      label: "Black Thread",
    },
    {
      id: "brick-wall",
      img: "https://www.transparenttextures.com/patterns/brick-wall-dark.png",
      label: "Brick Wall",
    },
    {
      id: "honeycomb",
      img: "https://www.transparenttextures.com/patterns/light-honeycomb-dark.png",
      label: "Honeycomb",
    },
    {
      id: "skeletal-weave",
      img: "https://www.transparenttextures.com/patterns/skeletal-weave.png",
      label: "Skeletal Weave",
    },
    {
      id: "triangles",
      img: "https://www.transparenttextures.com/patterns/triangles.png",
      label: "Triangles",
    },
    {
      id: "crisp-paper",
      img: "https://www.transparenttextures.com/patterns/crisp-paper-ruffles.png",
      label: "Crisp Paper",
    },
    {
      id: "wood-planks",
      img: "https://www.transparenttextures.com/patterns/dark-wood.png",
      label: "Wood Planks",
    },
    {
      id: "white-feathers",
      img: "https://www.transparenttextures.com/patterns/subtle-white-feathers.png",
      label: "White Feathers",
    },
    {
      id: "diagonales",
      img: "https://www.transparenttextures.com/patterns/diagonales-decalees.png",
      label: "Diagonales Decalees",
    },
    {
      id: "white-diamond",
      img: "https://www.transparenttextures.com/patterns/white-diamond.png",
      label: "White Diamond",
    },
    {
      id: "asfalt",
      img: "https://www.transparenttextures.com/patterns/asfalt-light.png",
      label: "Asfalt",
    },
    {
      id: "connected",
      img: "https://www.transparenttextures.com/patterns/connected.png",
      label: "Connected",
    },
    {
      id: "dark-exa",
      img: "https://www.transparenttextures.com/patterns/dark-exa.png",
      label: "Dark Exa",
    },
    {
      id: "dark-mosaic",
      img: "https://www.transparenttextures.com/patterns/dark-mosaic.png",
      label: "Dark Mosaic",
    },
  ];

  export default backgrounds;