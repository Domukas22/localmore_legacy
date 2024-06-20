
//



Image blur (on Figma): 
- Strech image to every corner (NOT cover)
- Add a 100px blur
- Export (600px width, 196px height)
- Add a darkening overlay:
  ::before {
    background-color: #0006;
    content: "";
    height: 100%;
    left: 0;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 4;
  }