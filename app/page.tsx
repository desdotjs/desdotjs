"use client";

import { useEffect, useRef, useState } from "react";
import { posts } from "@/data/posts";
import type { Post } from "@/types/post";
import { sketches } from "@/sketches/registry";

// no poster yet = flat colored block keyed to the post type.
// swap in the real <img> the moment a poster path exists.

function PostMedia({ post }: { post: Post }) {

  if (post.poster) {
    // plain <img> on purpose: next/image re-encodes to webp/avif, and for
    // an art site the poster should be the bytes you exported.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={post.poster} alt={post.title} />;
  }

  return <div className="media-placeholder" data-type={post.type} />;

}

// runs a sketch for real. p5 and the sketch are both imported lazily, so
// neither is in the initial bundle — they arrive when a blowup opens and
// the instance is torn down again on close.

function SketchMount({ sketchId }: { sketchId: string }) {

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    const load = sketches[sketchId];
    if (!load) return;

    let instance: { remove: () => void } | null = null;
    let cancelled = false;

    (async () => {

      const p5 = (await import("p5")).default;
      const sketch = await load();

      // the closeup can be shut before these imports land
      if (cancelled || !containerRef.current) return;

      instance = new p5(sketch.default, containerRef.current);

    })();

    return () => {
      cancelled = true;
      if (instance) instance.remove();
    };

  }, [sketchId]);

  return <div className="sketch-mount" ref={containerRef} />;

}

// the blowup is the one place the real piece runs, rather than a poster

function CloseupMedia({ post }: { post: Post }) {

  // image and video get checked first on purpose: SketchPost's own `type`
  // is a union ("p5" | "three"), which typescript can't subtract from the
  // rest, so narrowing has to run positively rather than by elimination

  if (post.type === "image") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={post.src} alt={post.title} />;
  }

  if (post.type === "video") {
    return <video src={post.src} controls loop playsInline />;
  }

  if (sketches[post.sketchId]) {
    return <SketchMount sketchId={post.sketchId} />;
  }

  // registered id with no sketch behind it — three.js isn't installed
  // yet, so those fall through to the same block the tiles use
  return <div className="media-placeholder" data-type={post.type} />;

}

function PostCloseup({
  post,
  onClose,
  onPrev,
  onNext,
}: {
  post: Post;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {

  // the page behind shouldn't scroll while the overlay is up.
  // empty deps on purpose — re-running this would capture "hidden" as the
  // value to restore and leave the body locked after close.

  useEffect(() => {

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };

  }, []);

  useEffect(() => {

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowUp") onPrev();
      if (e.key === "ArrowDown") onNext();
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);

  }, [onClose, onPrev, onNext]);

  return (

    // any click that reaches the scrim closes — the frame below stops
    // its own clicks from getting here
    <div
      className="closeup-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
    >

      <button
        className="closeup-nav"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="previous post"
      >
        ∧
      </button>

      <div
        className="closeup-frame"
        data-ratio={post.ratio}
        onClick={(e) => e.stopPropagation()}
      >

        <div className="closeup-media" data-ratio={post.ratio}>
          <CloseupMedia post={post} />
        </div>

        <div className="closeup-actions">
          <div className="action-upvote">▲</div>
          <div className="action-bookmark">▢</div>
          <div className="action-message">✉</div>
        </div>

        <div className="closeup-meta">

          <div className="closeup-meta-top">
            <span className="post-title">{post.title}</span>
            <span className="post-date">{post.date}</span>
          </div>

          <p className="post-description">{post.description}</p>

        </div>

      </div>

      <button
        className="closeup-nav"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="next post"
      >
        ∨
      </button>

    </div>
  );

}

export default function Home() {

  const [view, setView] = useState<"grid" | "list">("list");

  // which post is blown up, by index — null is closed. index rather than
  // slug so the chevrons can just step through the array.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openPost = openIndex === null ? null : posts[openIndex];

  function step(delta: number) {
    setOpenIndex((i) =>
      i === null ? i : (i + delta + posts.length) % posts.length
    );
  }

  return (
    <>

      <div className="page-header-container">

        <div className="page-header-bar">

          <div className="view-toggle">

            <button
              onClick={() => setView("grid")}
              aria-pressed={view === "grid"}
              aria-label="grid view"
            >
              ▦
            </button>

            <button
              onClick={() => setView("list")}
              aria-pressed={view === "list"}
              aria-label="list view"
            >
              ☰
            </button>

          </div>

          <p>desdotjs.com</p>
          <p>social icons</p>

        </div>

      </div>

      {view === "list" ? (
        <>

          <div className="profile-header-container">

            <div className="pfp">

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pfp.jpg" alt="profile picture" />

            </div>

            <div className="profile-info">

              <div className="profile-nav-buttons">

                <ul>
                  <li>archive</li>
                  <li>documentation</li>
                  <li>contact</li>

                </ul>

              </div>

            </div>

          </div>

          <div className="post-tile-wrapper">

            {posts.map((post, i) => (

              <div className="post-tile" key={post.slug}>

                <div className="post-body">

                  {/* a <button> so it's clickable and keyboard reachable */}
                  <button
                    className="post-media"
                    data-ratio={post.ratio}
                    onClick={() => setOpenIndex(i)}
                    aria-label={`open ${post.title}`}
                  >
                    <PostMedia post={post} />
                  </button>

                  <div className="post-actions">
                    <div className="action-upvote">▲</div>
                    <div className="action-bookmark">▢</div>
                    <div className="action-message">✉</div>
                  </div>

                </div>

                <div className="post-meta">
                  <span className="post-title">{post.title}</span>
                  <span className="post-date">{post.date}</span>
                  <p className="post-description">{post.description}</p>
                </div>

              </div>

            ))}

          </div>

        </>
      ) : (
        <>

          {/* grid view: profile comes off the right rail and sits inline */}

          <div className="profile-header-inline">

            <div className="pfp">

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/pfp.jpg" alt="profile picture" />

            </div>

            <div className="profile-info">

              <div className="profile-name">des</div>

              <ul className="profile-nav-inline">
                <li>contact</li>
                <li>documentation</li>
                <li>archive</li>
              </ul>

              <p className="profile-bio">
                bio goes here — a couple of lines about the work, what it&rsquo;s
                made in, and why it lives on a site instead of a feed.
              </p>

            </div>

          </div>

          <div className="sort-bar">SORT BY ▾</div>

          <div className="post-grid">

            {posts.map((post, i) => (

              // the grid stays still images for performance — the piece
              // only actually runs once the blowup opens
              <button
                className="grid-tile"
                key={post.slug}
                title={post.title}
                onClick={() => setOpenIndex(i)}
              >

                <div className="grid-tile-media" data-ratio={post.ratio}>
                  <PostMedia post={post} />
                </div>

              </button>

            ))}

          </div>

        </>
      )}

      {/* the view underneath is untouched, so closing lands back on
          whichever one you opened from */}

      {openPost && (
        <PostCloseup
          post={openPost}
          onClose={() => setOpenIndex(null)}
          onPrev={() => step(-1)}
          onNext={() => step(1)}
        />
      )}

      <div className="footer">

      </div>

    </>
  );
}
