Hosting on GitHub pages
===================================

It is possible to host a task on GitHub pages. This repo contains a build file in the `.github` directory.
In addition to following the `GitHub pages documentation <https://docs.github.com/en/pages>`, the GitHub repo name needs to be put as the `VITE_BASE` environment variable: 
This ensures that the correct path is supplied.

.. code-block:: yaml 

  - run: pnpm build
      env:
        VITE_BASE: /githubRepoName/


