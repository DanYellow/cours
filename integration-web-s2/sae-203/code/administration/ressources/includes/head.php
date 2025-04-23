<base href="/<?php echo $_ENV['CHEMIN_BASE']; ?>">

<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="./ressources/css/ne-pas-modifier/fonts.css">

<meta name="robots" content="noindex, nofollow">

<script src="https://unpkg.com/@tailwindcss/browser@4?plugins=forms"></script>

<link rel="stylesheet" href="./administration/ressources/css/ne-pas-modifier/adm-style.css">

<style type="text/tailwindcss">
    [type='text'], input:where(:not([type])),
    [type='email'], [type='url'],
    [type='password'], [type='number'],
    [type='date'], [type='datetime-local'],
    [type='month'], [type='search'],
    [type='tel'], [type='time'],
    [type='week'], [multiple],
    textarea, select {
        border-color: var(--color-gray-500);
        @apply border text-base p-2.5 bg-white appearance-none leading-6;

        &:focus {
            @apply ring-2 ring-blue-500/50;
            border-color: var(--color-blue-600);
        }
    }

    [type='checkbox']:checked:hover, [type='checkbox']:checked:focus,
    [type='radio']:checked:hover, [type='radio']:checked:focus {
        border-color: transparent;
        background-color: currentColor;
    }

    [type='checkbox']:indeterminate {
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e");
        border-color: transparent;
        background-color: currentColor;
        background-size: 100% 100%;
        background-position: center;
        background-repeat: no-repeat;
    }

    [type='checkbox'] {
        border-radius: 0px;
        &:checked {
            background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
        }
    }

    [type='radio'] {
        border-radius: 100%;
        &:checked {
            background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
        }
    }

    [type='checkbox'], [type='radio'] {
        border-color: var(--color-gray-500);
        @apply border appearance-none text-blue-600 bg-white inline-block w-4 h-4;

        &:checked {
            border-color: transparent;
            background-color: currentColor;
            background-size: 100% 100%;
            background-position: center;
            background-repeat: no-repeat;
        }

        &:focus {
            outline: 2px solid transparent;
            @apply outline-offset-2;
            --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);
            --tw-ring-offset-width: 2px;
            --tw-ring-offset-color: #fff;
            --tw-ring-color: #2563eb;
            --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
            --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
            box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow);
        }
    }

    @media screen and (width <= theme(--container-4xl))  {
        table {
            border: 0;

            thead {
                border: none;
                clip: rect(0 0 0 0);
                height: 1px;
                margin: -1px;
                overflow: hidden;
                padding: 0;
                position: absolute;
                width: 1px;
            }

            tr {
                border-bottom: 1px solid var(--color-slate-200);
                display: block;

                &:last-child {
                    border-bottom-color: transparent;
                }
            }

            td {
                display: block;
                text-align: left;

                &::before {
                    content: attr(data-label);
                    font-weight: bold;
                    display: block;
                }
            }
        }
    }
</style>
