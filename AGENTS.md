<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep all replaceable event content in `src/lib/event-config.ts` so the experience remains presentation-only and easy to retheme.
- Keep the WebGL stage isolated behind the client-only home route because React Three Fiber depends on browser rendering.
- Keep the home experience fixed to the viewport and drive its six narrative states from one virtual progress value so wheel and touch input never create document scrolling.
