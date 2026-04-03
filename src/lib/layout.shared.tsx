import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { FlowkitLogo } from "@/components/flowkit-logo";

export const gitConfig = {
  user: "vzkiss",
  repo: "flowkit-ui",
  branch: "main",
  userWebsite: "https://vzkiss.com",
};

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <FlowkitLogo />
          flowkit-ui
        </>
      ),
    },
    githubUrl: `https://github.com/${gitConfig.user}/${gitConfig.repo}`,
  };
}
