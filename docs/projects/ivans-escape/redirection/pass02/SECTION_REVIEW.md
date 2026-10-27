# Six-section director review

These are my subjective production-review scores, not human approval, an external rating or a claim of equality with the reference. The rubric was recorded in PLAN.md before implementation: artwork/light30%, compositing/anatomy25%, editing/transitions20%, captions/readability15%, narrative/pacing10%. An obvious crop/anatomy defect, disappearing scene or unreadable caption blocks a pass independently of the average. Target: strictly above7 for every section.

## Iteration record

The incoming film was rejected for repetitive framing, incompatible backgrounds, weak transitions/captions and visible compositing defects. The first new-art pass still failed review: truncated portrait shoulders in sections1/3/4, floating copy rows in5, and the doubled hero during the outside dissolve in6. Those were corrected, rather than awarding scores to the first render.

The isolated section5 then failed decisively: memory shots30–32 disappeared behind the procedural underlay in the trimmed review, while the full master displayed them. Its provisional score was4.4 and it was rejected. Replacing nested Freeze memory rendering with sampled earlier shot data restored routine/reflection/replacement images; section/master pixel checks cover70/95/120/145 local frames. The final review below includes the repaired clip.

Contact-shadow ordering was also corrected after inspection:2D shadows must follow the opaque environment and precede their character. A regression assertion now protects that order. The incorrect generated outside backdrop was replaced before acceptance. All revised sections were rendered with fresh ANGLE browsers after the reused multi-worker browser crashed its GPU process.

## Final scores

| Section | Artwork/light | Composite/anatomy | Editing | Captions | Narrative | Weighted total |
|---|---:|---:|---:|---:|---:|---:|
|01 /00–10s|7.6|7.5|7.6|8.0|7.8|**7.66**|
|02 /10–20s|7.5|7.6|7.7|8.0|7.8|**7.67**|
|03 /20–30s|7.7|7.5|7.8|8.0|7.8|**7.73**|
|04 /30–40s|7.6|7.4|7.6|8.0|7.8|**7.63**|
|05 /40–50s|7.5|7.3|8.0|7.8|8.0|**7.65**|
|06 /50–60s|8.1|7.8|7.8|8.0|8.2|**7.96**|

All six clear7 under this rubric. No blocking defect remains in the inspected evidence. Stop this pass here for human review.

## Reasons and practical limits

01: Eye/full-body/foot/medium/rear variation now establishes Ivan and the ordered street. The new wide illustration has directional light and a grounded shadow. Short captions read against architecture. Separate walk cels remain limited to four drawings; locomotion is selective rather than fluid character animation.

02: A real foreground pier conceals the cut into the glass scene. The eight-frame reflection disagreement remains legible; the reaching cuff enters from offscreen, and the new awakening drawing adds a different composition. The foot crossing and crimson fracture provide the act change. The large hand and shoe inserts are intentional detail shots, still less nuanced than the best reference drawings.

03: The sprint key illustration introduces a low action viewpoint before the side-running cels and peeling planes. Wipes and ink streaks connect the direction changes. Cropped portrait edges no longer float inside the canvas. Running cels have a visibly limited exposure count and are the main reason compositing is7.5 rather than a higher score.

04: Extreme-wide scale at the world edge contrasts with the duplicate pair, refusal, hand detail and reaching leap. Painted road regions detach around an intact contact strip rather than breaking perspective in3D. The dark openings are deliberate fracture/void regions; the plane arrangement remains stylized rather than physically simulated rubble.

05: All four real memory images now appear in order. Eighteen identical figures occupy separated perspective rows instead of overlapping bodies. The collapse and leap restore motion after short memory holds. This section is the weakest artistically: it still uses repeated illustrated poses and limited cel changes, but it is coherent and no longer contains missing shots or tangled duplicates.

06: The architecture opens to a warm painted landscape. The light bridge replaces the doubled silhouette, followed by one quiet hero composition, a centered masked title and the connection message. White exposure frames at1619/1620 and the first dark title-reveal frame at1722 are authored punctuation. The outside painting is held deliberately; there is no full hair/cloth rig.

## Evidence actually inspected

- All7,833 reference frames in55 chronological thumbnail sheets, plus larger source-window samples. Coverage and limitations: REFERENCE_STUDY.md.
- Six640×360 H.264 review clips,300frames each. Every frame decoded to320×180 and inspected in18 adjacent-frame sheets at160×90, with larger selected640×360 stills for anatomy/crops/type. This is not a claim that every finished frame was examined at1080p.
- Six13-frame section contact sheets, reverse-order still sampling and byte-identical repeat captures. Selected section/master renders compare byte-for-byte, including every memory source.
- Studio playback for the opening and exact-frame scrubbing of the repaired memory shot. Rendered clip cadence is30fps; interactive preview speed depends on the local GPU. Vocal anchors are machine aligned and retain a human timing-review limitation.

Evidence directory: out/ivans-escape/pass02. Files S01.mp4 through S06.mp4 are the current six sections. S01.png through S06.png are section contact sheets; S01-motion-1.png through S06-motion-3.png show all frames. RENDER_CHECKS.json records renderer conditions and successful comparisons. No full-resolution full-film export was repeated.
