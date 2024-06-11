import { Head, Link, useForm } from "@inertiajs/react";
import App from "@/Layouts/App.jsx";
import LoginRequired from "@/Components/LoginRequired.jsx";
import { Beatmap } from "@/Components/Beatmap.jsx";
import { Button } from "@/Components/ui/button";

const Queue = ({ auth, beatmaps, title }) => {
    let params = new URLSearchParams(window.location.search);
    let query_url = window.location.pathname;

    const { data, setData, get, processing, errors, reset } = useForm({
        map_style:
            params.get("map_style") === null ? "all" : params.get("map_style"),
        status: params.get("status") === null ? "all" : params.get("status"),
    });

    const submit = (e) => {
        e.preventDefault();
        get(query_url, {
            preserveState: true,
        });
    };

    return (
        <>
            <Head title={title} />
            {auth.user === null ? (
                <LoginRequired />
            ) : (
                <>
                    <div className="text-center">
                        <h1 className="section-title text-center">{title}</h1>
                    </div>

                    <div className="bg-caution rounded text-caution-foreground p-4">
                        <h4 className="font-bold">IMPORTANT</h4>
                        <p>
                            In case your beatmap is accepted by two{" "}
                            <strong>sd_mango</strong> nominators, make sure to
                            add the following code in your map's description
                        </p>
                        <code className="mt-2 code-block">
                            [notice][centre][size=150]
                            <br />
                            🥭[url=https://x.com/sd_mango_osu][b][i]This map was
                            brought to you by sd_mango [/b][/i][/url]🥭
                            <br />
                            [/centre][/size][/notice]
                        </code>
                    </div>

                    <div className="queue-filter">
                        <form onSubmit={submit}>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="w-full">
                                    <label>Request status</label>
                                    <select
                                        className="form-control"
                                        value={data.status}
                                        onChange={(e) =>
                                            setData("status", e.target.value)
                                        }
                                    >
                                        <option value="default">Default</option>
                                        <option value="PENDING">Pending</option>
                                        <option value="ACCEPTED">
                                            Accepted
                                        </option>
                                        <option value="NOMINATED">
                                            Nominated
                                        </option>
                                        <option value="INVALID">Invalid</option>
                                        <option value="HIDDEN">Hidden</option>
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label>Map style</label>
                                    <select
                                        className="form-control"
                                        value={data.map_style}
                                        onChange={(e) =>
                                            setData("map_style", e.target.value)
                                        }
                                    >
                                        <option value="all">All</option>
                                        <option value="Jumps">Jumps</option>
                                        <option value="Streams">Streams</option>
                                        <option value="Difficult mechanics">
                                            Difficult mechanics
                                        </option>
                                    </select>
                                </div>
                                <div className="w-full">
                                    <label>&nbsp;</label>
                                    <Button
                                        disabled={processing}
                                        className="min-w-full"
                                    >
                                        Filter
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(350px,1fr))] justify-center">
                        {beatmaps.data.map((beatmap) => (
                            <Beatmap
                                key={beatmap.id}
                                beatmap={beatmap}
                                auth={auth}
                            />
                        ))}
                    </div>

                    <nav className="mt-5 mb-5">
                        <ul className="pagination justify-content-center">
                            {beatmaps.links.map((link) => (
                                <li
                                    className={
                                        link.url === null
                                            ? "page-item disabled"
                                            : link.active
                                              ? "page-item active"
                                              : "page-item"
                                    }
                                >
                                    <Link
                                        className="page-link"
                                        href={link.url}
                                        tabIndex="-1"
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </nav>
                </>
            )}
        </>
    );
};

Queue.layout = (page) => <App children={page} />;
export default Queue;
