import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/sections.css";

import { $, $$ } from "./lib/dom";
import { initBearcat } from "./modules/bearcat";
import { initWash } from "./modules/wash";
import { initNav } from "./modules/nav";
import { initTilt } from "./modules/tilt";
import { initReveal } from "./modules/reveal";
import {
  renderEducation,
  renderJobs,
  renderProject,
  renderSkills,
} from "./render/sections";

renderJobs();
renderProject();
renderSkills();
renderEducation();

initWash($<HTMLCanvasElement>("#wash"));
initNav($("#nav"));
initTilt($$("[data-tilt]"));
initReveal();
initBearcat($$(".uc"));
