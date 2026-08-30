import { $, el } from "../lib/dom";
import {
  education,
  highlights,
  jobs,
  project,
  skillGroups,
} from "../data/resume";

export function renderHighlights(): void {
  const mount = $("#highlights");
  for (const h of highlights) {
    const attrs: Record<string, string> = { class: "n", "data-count": String(h.value) };
    if (h.suffix) attrs["data-suffix"] = h.suffix;
    if (h.decimals) attrs["data-decimals"] = String(h.decimals);
    mount.append(
      el("div", { class: "tile rv", "data-tilt": "" }, [
        el("div", attrs, ["0"]),
        el("div", { class: "k" }, [h.label]),
      ]),
    );
  }
}

export function renderJobs(): void {
  const mount = $("#jobs");
  for (const job of jobs) {
    const meta = el("div", { class: "job-meta" }, [
      el("span", { class: "when" }, [job.when]),
      el("span", {}, [job.where]),
    ]);

    const body = el("div", {}, [
      el("h3", { class: "job-title" }, [
        job.company,
        ...(job.detail ? [" ", el("span", {}, [`· ${job.detail}`])] : []),
      ]),
      el("div", { class: "job-role" }, [
        job.role + (job.note ? ` · ${job.note}` : ""),
      ]),
      ...(job.summary ? [el("p", { class: "job-sum" }, [job.summary])] : []),
      el(
        "ul",
        {},
        job.bullets.map((bullet) =>
          el("li", {}, [
            el("b", { class: "tag" }, [bullet.tag]),
            el("span", { html: bullet.html }),
          ]),
        ),
      ),
    ]);

    mount.append(el("article", { class: "job rv" }, [meta, body]));
  }
}

export function renderProject(): void {
  const mount = $("#project");
  const art = el("div", { class: "proj-art", "aria-hidden": "true" }, [
    el("div", { class: "proj-badge" }, [project.badge]),
    el("div", { class: "phone" }, [
      el("div", { class: "bar b" }),
      el("div", { class: "bar" }),
      el("div", { class: "bar w" }),
      el("div", { class: "msg" }, ["Bengals up 3 with 2:10 left. Who has it?"]),
      el("div", { class: "msg me" }, ["Burrow. Every time."]),
      el("div", { class: "msg" }, ["Live: CIN 27 BAL 24 · Q4"]),
    ]),
  ]);

  const body = el("div", { class: "proj-body" }, [
    el("h3", {}, [project.name, " ", el("span", {}, [project.domain])]),
    ...project.paragraphs.map((text) => el("p", {}, [text])),
    el("div", { class: "cta-row" }, [
      el("a", {
        class: "btn btn-primary",
        href: project.url,
        target: "_blank",
        rel: "noopener",
      }, [`Visit ${project.domain}`]),
    ]),
  ]);

  mount.append(el("article", { class: "proj rv" }, [art, body]));
}

export function renderSkills(): void {
  const mount = $("#skill-groups");
  for (const group of skillGroups) {
    mount.append(
      el("div", { class: "sk card rv", style: `--c:${group.color}` }, [
        el("h3", {}, [el("i"), group.name]),
        el(
          "div",
          { class: "chips" },
          group.items.map((item) => el("span", { class: "chip" }, [item])),
        ),
      ]),
    );
  }
}

export function renderEducation(): void {
  const mount = $("#edu");
  mount.append(
    el("div", { class: "edu card rv" }, [
      el("div", {}, [
        el("div", { class: "edu-deg" }, [
          education.degree,
          " ",
          el("span", {}, [`· ${education.track}`]),
        ]),
        el("p", {}, [education.blurb]),
      ]),
      el(
        "div",
        { class: "edu-facts" },
        education.facts.map((fact) =>
          el("div", { class: "fact" }, [
            el("div", { class: "n" }, [fact.n]),
            el("div", { class: "k" }, [fact.k]),
          ]),
        ),
      ),
    ]),
  );
}
