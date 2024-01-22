import PageRender from "@/components/page/PageRender";
import SearchPage from "@/components/page/SearchPage";

export default function Home() {
  return <PageRender Render={SearchPage} />;
}
