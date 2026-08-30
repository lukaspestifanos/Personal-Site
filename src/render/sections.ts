import { $, el } from "../lib/dom";
import { education, jobs, project, skillGroups } from "../data/resume";

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
  const art = el("div", { class: "proj-art" }, [
    el("div", { class: "proj-badge" }, [project.badge]),
    ...project.shots.map((shot) =>
      el("img", {
        class: `shot ${shot.kind}`,
        src: shot.src,
        alt: shot.alt,
        loading: "lazy",
      }),
    ),
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
